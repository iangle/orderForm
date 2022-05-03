import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation} from 'react-router-dom';

import logo from '../../assets/fries.png';
import useStyles from './styles';

const Navbar = ( cart) => {
    
    const classes = useStyles();
    const location = useLocation();

    const username = {};
    
    let theCart = cart.cart;
    let totalItems = 0;
    for(let i = 0; i < theCart.length; i++){
        totalItems += theCart[i].quantity;
    }

    const isUsername = !username;

    const SetUsername = () => (
        <Typography variant="h6" color='inherit'>{username}</Typography>
    );

    const SetLogin = () => (
        <Typography component={Link} to='/login' variant="h6" color='inherit'>Login</Typography>
    );

  return (
    <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to='/' variant="h6" className={classes.title} color='inherit'>
                    <img src={logo} alt="commerce.js" height="25px" className={classes.image} />
                    Burger Shop
                </Typography>
                <div className={classes.grow} />
                { isUsername ? <SetUsername /> : <SetLogin /> }
                {(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') && (
                    <div className={classes.button}>
                        <IconButton component={Link} to='/cart' aria-label="Show Cart Items" color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> 
                )}
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar