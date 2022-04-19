import React, {useState, useEffect} from 'react'

import {Products, Navbar, Cart} from './components';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await fetch('https://yvkt6ela28.execute-api.us-west-2.amazonaws.com/Prod/cart', {
      headers: {'Content-Type': 'application/json'},
      method: 'PUT',
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

  const fetchCart = async () => {
    const response = await fetch('https://yvkt6ela28.execute-api.us-west-2.amazonaws.com/Prod/cart', { credentials: 'include', })
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

  const handleAddToCart = async (productId, quantity) => {
    
    const response = await fetch('https://yvkt6ela28.execute-api.us-west-2.amazonaws.com/Prod/cart', {
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
  

   const getProducts = async () => {
    const response = await fetch('https://w9rdt5h82l.execute-api.us-west-2.amazonaws.com/Prod/product')
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

  useEffect(() => {

    getProducts();
    fetchCart();
  }, []);


  return (
    <Router>
      <div> 
        <Navbar cart={cart}/>
        <Switch>
          <Route exact path='/'>
            <Products products={products} onAddToCart={handleAddToCart}/> 
          </Route>
          <Route exact path='/cart'>
            <Cart cart={cart}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;