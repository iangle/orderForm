import os

import requests
from aws_lambda_powertools import Logger, Tracer

from shared import NotFoundException

product_service_url = os.environ["PRODUCT_SERVICE_URL"]

logger = Logger()
tracer = Tracer()


@tracer.capture_method
def get_product_from_external_service(product_id):
    """
    Call product API to retrieve product details
    """
    response = requests.get(product_service_url + f"{product_id}")

    logger.info(response.text)

    try:
        response_dict = response.json()["Items"]

        logger.info(response.text)

        if response_dict is None:
            raise NotFoundException
            
    except KeyError:
        logger.warn("No product found with id %s", product_id)
        raise NotFoundException

    return response_dict
