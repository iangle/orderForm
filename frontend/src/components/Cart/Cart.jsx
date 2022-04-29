import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ( { cart, handleUpdateCartQty, checkout} ) => {

    //computes the total number of items in the cart and their combined price
    let totalItems = 0;
    let totalPrice = 0;
    for(let i = 0; i < cart.length; i++){
        totalItems += cart[i].quantity;
        totalPrice += cart[i].productDetail.price * cart[i].quantity;
    }

    const isEmpty = !totalItems;
    const classes = useStyles();

    //empties the cart
    const clearCart = () =>{
        for(let i = 0; i < cart.length; i++){
            handleUpdateCartQty(cart[i].productDetail.productId, 0);
        }
    }

    //displays a message if there are no items in the cart
    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart, start adding some!</Typography>
    );

    //displays the items in the cart if there are items in the cart
    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.map((item) => (
                <Grid item xs={12} sm={4} key={item.productDetail.productId}>
                    <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty}/>
                </Grid>
            ))}
        </Grid>

        <div className={classes.cardDetails}>
                <Typography variant="h4">SubTotal: ${totalPrice} </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={() => clearCart()}>Empty Cart </Button>
                    <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary' onClick={() => checkout()}>Checkout </Button>
                </div>
        </div>
        </>
    );

  return (
    <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart </Typography>
        { isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>

  )
}

export default Cart