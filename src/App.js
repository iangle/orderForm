import React, {useState, useEffect} from 'react'

import {Products, Navbar, Cart} from './components';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  //updates the quantity of a specified product in the cart
  const handleUpdateCartQty = async (productId, quantity) => {
    await fetch('https://aub9m96i3e.execute-api.us-west-2.amazonaws.com/Prod/cart/' + productId, {
      headers: {'Content-Type': 'application/json'},
      method: 'PUT',
      body: JSON.stringify({quantity}),
      credentials: 'include',
    })
    .then(response => {
      console.log(response);
      if(response.status !== 200){
        console.log("an error occured")
      }else{
        console.log("successfully retrieved payload");
      }

      return response
    }).catch(error => {console.log(error);});

    fetchCart();
  }

  //retreives the cart from the backend and stores the JSON into the cart variable
  const fetchCart = async () => {
    const response = await fetch('https://aub9m96i3e.execute-api.us-west-2.amazonaws.com/Prod/cart', { credentials: 'include', })
    .then(response => {
      console.log(response);
      if(response.status !== 200){
        console.log("an error occured")
      }else{
        console.log("successfully retrieved payload");
      }

      return response
    }).catch(error => {console.log(error);});

    const data = await response.json();

    setCart(data.products);
  }

  //adds a product to the cart
  const handleAddToCart = async (productId, quantity) => {
    
    await fetch('https://aub9m96i3e.execute-api.us-west-2.amazonaws.com/Prod/cart', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({productId, quantity}),
      credentials: 'include',
    })
    .then(response => {
      console.log(response);
      if(response.status !== 200){
        console.log("an error occured")
      }else{
        console.log("successfully retrieved payload");
      }

      return response
    }).catch(error => {console.log(error);});

    fetchCart();

  }
  
  //gets all the products from the backend so we can display them in the website
  const getProducts = async () => {
  const response = await fetch('https://1ugi1yyrii.execute-api.us-west-2.amazonaws.com/Prod/product')
  .then(response => {
    console.log(response);
    if(response.status !== 200){
      console.log("an error occured when retrieving the payload")
    } else{
      console.log("successfully retrieved payload")
    }

    return response;
  }).catch(error => {console.log(error);});

  const data = await response.json();

  setProducts(data.products);
}

  //this function runs everytime the page reloads
  useEffect(() => {

    getProducts();
    fetchCart();
  }, []);


  //return all of our components and pass in the values we need to use
  return (
    <Router>
      <div> 
        <Navbar cart={cart}/>
        <Switch>
          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart}/> 
          </Route>
          <Route exact path='/cart'>
            <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;