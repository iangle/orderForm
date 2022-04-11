import React from 'react';
import {Grid} from '@material-ui/core';

import Product from './Product/Product';

const products = [
    {id: 1, name: 'shoes', description: 'Running Shoes', price: '5', image: '../../Images/shoes.jpg'},
    {id: 2, name: 'shoes2', description: 'Running Shoes for boys', price: '7', image: 'https://www.pexels.com/photo/pair-of-blue-lace-up-sneakers-19090/'},
];

const Products = () => {
    return(    
    <main>
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg ={3}>
                    <Product product={product}/>
                </Grid>
            ))}
        </Grid>
    </main>)

}

export default Products