import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ( { cart } ) => {

    let totalItems = 0;
    let totalPrice = 0;
    for(let i = 0; i < cart.length; i++){
        totalItems += cart[i].quantity;
        totalPrice += cart[i].productDetail.price * cart[i].quantity;
    }

    const isEmpty = !totalItems;
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart, start adding some!</Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.map((item) => (
                <Grid item xs={12} sm={4} key={item.productDetail.productId}>
                    <CartItem item={item}/>
                </Grid>
            ))}
        </Grid>

        <div className={classes.cardDetails}>
                <Typography variant="h4">SubTotal: ${totalPrice} </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'>Empty Cart </Button>
                    <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Checkout </Button>
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