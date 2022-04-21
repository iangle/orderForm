import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons';

import useStyles from './styles';

const Product = ( { product, onAddToCart } ) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.picture} title={product.name}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography gutterBottom variant="h5">
                    {product.name}
                </Typography>
                <Typography variant="h5">
                    ${product.price}
                </Typography>
            </div>
            <Typography variant="body2" color="textSecondary"> {product.description} </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add To Cart" onClick={() => {onAddToCart(product.productId, 1)}}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

export default Product