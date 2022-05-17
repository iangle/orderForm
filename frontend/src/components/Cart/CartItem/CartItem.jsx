import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from "@material-ui/core";

import useStyles from './styles';


const CartItem = ( { item, handleUpdateCartQty} ) => {
  
  const classes = useStyles();

  
  return (
      <Card>
          <CardMedia image={item.productDetail[0].picture} alt={item.productDetail[0].name} className={classes.media}/>
          <CardContent className={classes.cardContent}>
              <Typography variant='h4'> {item.productDetail[0].name} </Typography>
              <Typography variant='h5'> ${item.productDetail[0].price} </Typography>
          </CardContent>

          <CardActions className={classes.cardActions}>
              <div className={classes.buttons}>
                <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.productDetail[0].productId, item.quantity - 1)}>- </Button>
                <Typography>{item.quantity}</Typography>
                <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.productDetail[0].productId, item.quantity + 1)}>+ </Button>

              </div>

              <Button variant='contained' type='button' color='secondary' onClick={() => handleUpdateCartQty(item.productDetail[0].productId, 0)}>Remove</Button>

          </CardActions>
      </Card>
  )
}

export default CartItem