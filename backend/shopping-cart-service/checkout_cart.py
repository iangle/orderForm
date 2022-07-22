import json
import os

import boto3
from aws_lambda_powertools import Logger, Metrics, Tracer
from boto3.dynamodb.conditions import Key
from datetime import datetime

from shared import get_cart_id, get_headers, handle_decimal_type

logger = Logger()
tracer = Tracer()
metrics = Metrics()

dynamodb = boto3.resource("dynamodb")

logger.debug("Initializing DDB Table %s", os.environ["TABLE_NAME"])
table = dynamodb.Table(os.environ["TABLE_NAME"])
orderTable = dynamodb.Table(os.environ["ORDER_TABLE_NAME"])


@metrics.log_metrics(capture_cold_start_metric=True)
@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
def lambda_handler(event, context):
    """
    Update cart table to use user identifier instead of anonymous cookie value as a key. This will be called when a user
    is logged in.
    """
    cart_id, _ = get_cart_id(event["headers"])

    try:
        # Because this method is authorized at API gateway layer, we don't need to validate the JWT claims here
        user_id = event["requestContext"]["authorizer"]["claims"]["sub"]
    except KeyError:

        return {
            "statusCode": 400,
            "headers": get_headers(cart_id),
            "body": json.dumps({"message": "Invalid user"}),
        }

    # Get all cart items belonging to the user's identity
    response = table.query(
        KeyConditionExpression=Key("pk").eq(f"user#{user_id}")
        & Key("sk").begins_with("product#"),
        ConsistentRead=True,  # Perform a strongly consistent read here to ensure we get correct and up to date cart
    )

    cart_items = response.get("Items")

    cart = []

    for item in cart_items:

        quantity = {"quantity": item["quantity"]}
        product_detail = {"productDetail": item["productDetail"]}
        product_detail.update(quantity)

        cart.append(product_detail)
    

    current_date_time = datetime.now()
    current_date_time = current_date_time.strftime("%d/%m/%Y %H:%M:%S")

    #add items to the restaurantOrders database
    orderTable.update_item(
        Key={"userId": user_id, "date": current_date_time},
        ExpressionAttributeNames={
            "#cartItems": "cartItems",
        },
        ExpressionAttributeValues={
            ":cartItems": cart,
        },
        UpdateExpression="SET #cartItems = :cartItems",
    )

    #deletes items from temporary database
    with table.batch_writer() as batch:
        for item in cart_items:
            # Delete ordered items
            batch.delete_item(Key={"pk": item["pk"], "sk": item["sk"]})

    metrics.add_metric(name="CartCheckedOut", unit="Count", value=1)
    logger.info({"action": "CartCheckedOut", "cartItems": cart})

    return {
        "statusCode": 200,
        "headers": get_headers(cart_id),
        "body": json.dumps(
            {"products": response.get("Items")}, default=handle_decimal_type
        ),
    }
