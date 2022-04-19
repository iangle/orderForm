import React from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from "@material-ui/core";

import useStyles from './styles';


const CartItem = ( {item} ) => {
  const classes = useStyles();

  console.log(item);
  
  return (
      <Card>
          <CardMedia image={item.productDetail.picture} alt={item.productDetail.name} className={classes.media}/>
          <CardContent className={classes.cardContent}>
              <Typography variant='h4'> {item.productDetail.name} </Typography>
              <Typography variant='h5'> ${item.productDetail.price} </Typography>
          </CardContent>

          <CardActions className={classes.cardActions}>
              <div className={classes.buttons}>
                <Button type='button' size='small'>- </Button>
                <Typography>{item.quantity}</Typography>
                <Button type='button' size='small'>+ </Button>

              </div>

              <Button variant='contained' type='button' color='secondary'>Remove</Button>

          </CardActions>
      </Card>
  )
}

export default CartItem