import React, {useState, useEffect} from 'react'

import {Products, Navbar, Cart, Login, Register} from './components';

import {Switch, Route} from 'react-router-dom';

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { useHistory } from 'react-router-dom';


const App = () => {

  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [token, setToken] = useState('');


  function loginUser(username, password){

    var authenticationData = {
      Username : username,
      Password : password,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var poolData = {
      UserPoolId: 'us-west-2_iSUbbjgXc', // Your user pool id here
      ClientId: '2qcg48u7lrjd25cbsbd0ju3lse', // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var userData = {
      Username : username,
      Pool : userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          const idToken = result.getIdToken().getJwtToken();
          setToken(idToken);
          fetchCart();
          history.push('/');

      },

      onFailure: function(err) {
          alert(err);
      },

  });
}

function registerUser(username, password){

  var poolData = {
    UserPoolId: 'us-west-2_iSUbbjgXc', // Your user pool id here
    ClientId: '2qcg48u7lrjd25cbsbd0ju3lse', // Your client id here
  };

  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var cognitoUser;
  userPool.signUp(username, password, null, null, function(err, result){
    if (err) {
        console.log(err);
        alert(err);
        return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    alert('Thank you for registering: ' + cognitoUser.getUsername());
    loginUser(username, password);
});
  
}

  //updates the quantity of a specified product in the cart
  const handleUpdateCartQty = async (productId, quantity) => {
    await fetch('https://69xv1m9khl.execute-api.us-west-2.amazonaws.com/Prod/cart/' + productId, {
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
    const response = await fetch('https://69xv1m9khl.execute-api.us-west-2.amazonaws.com/Prod/cart/', { 
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
    
    await fetch('https://69xv1m9khl.execute-api.us-west-2.amazonaws.com/Prod/cart', {
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
    await fetch('https://69xv1m9khl.execute-api.us-west-2.amazonaws.com/Prod/cart/checkout', {
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