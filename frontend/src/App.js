import React, {useState, useEffect} from 'react'

import {Products, Navbar, Cart, Login, Register} from './components';

import {Switch, Route} from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { useHistory } from 'react-router-dom';


const App = () => {

  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [token, setToken] = useState('');


  //sends a POST request to the backend and retrieves the id token for the user
  //with the given username and password
  const loginUser = async(username, password) => {

    const response = await fetch('https://1ovbu6d97g.execute-api.us-west-2.amazonaws.com/prod/login', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({username, password})
    })
    .then( response => {
      console.log(response);

      if(response.status !== 200){
        console.log("an error occured")
        alert('looks like the username or password is incorrect')
      }else{
        console.log("successfully retrieved payload");
        fetchCart();
        history.push('/');
      }

      return response;

    }).catch(error => {console.log(error);})

    const body = await response.json();

    setToken(body['token']);

}

//send a POST request to the backend to register a user with the given username and password
const registerUser = async(username, password) => {

    await fetch('https://1ovbu6d97g.execute-api.us-west-2.amazonaws.com/prod/register', {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({username, password})
    })
    .then( response => {

      console.log(response);

      if(response.status !== 200){
        console.log("an error occured")
        alert('sorry, that user already exists!')
      }else{
        console.log("successfully retrieved payload");
        alert('Thank you for registering: ' + username);
        loginUser(username, password);
      }

      return response

    })
    .catch(error => {console.log(error)})

}

  //updates the quantity of a specified product in the cart
  const handleUpdateCartQty = async (productId, quantity) => {
    await fetch('https://3fyby70779.execute-api.us-west-2.amazonaws.com/Prod/cart/' + productId, {
      headers: {'Content-Type': 'application/json', 'Authorization': token},
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
    const response = await fetch('https://3fyby70779.execute-api.us-west-2.amazonaws.com/Prod/cart', { 
      headers: { 'Authorization': token },
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

    const data = await response.json();

    setCart(data.products);
  }

  //adds a product to the cart
  const handleAddToCart = async (productId, quantity) => {
    
    await fetch('https://3fyby70779.execute-api.us-west-2.amazonaws.com/Prod/cart', {
      headers: {'Content-Type': 'application/json', 'Authorization': token},
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
  const response = await fetch('https://wetrk15va0.execute-api.us-west-2.amazonaws.com/prod/')
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

    setProducts(data.Items);
  }

  const checkout = async () => {
    await fetch('https://3fyby70779.execute-api.us-west-2.amazonaws.com/Prod/cart/checkout', {
      headers: {'Content-Type': 'application/json', 'Authorization': token},
      method: 'POST',
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


  //this function runs everytime the page reloads
  useEffect(() => {

    getProducts();
    fetchCart();

  }, []);

  //return all of our components and pass in the values we need to use
  return (
    <div> 
      <Navbar cart={cart} />
      <Switch>
        <Route exact path='/'>
          <Products products={products} onAddToCart={handleAddToCart} fetchCart={fetchCart}/> 
        </Route>
        <Route exact path='/cart'>
          <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} checkout={checkout}/>
        </Route>
        <Route exact path='/login'>
          <Login loginUser={loginUser} />
        </Route>
        <Route exact path='/register'>
          <Register registerUser={registerUser}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;