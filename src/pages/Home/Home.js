import React, {useState} from 'react';
import homeImage from '../../Images/homePageFoodImage.jpg';
import './Home.css'
import './Order.css'

function Home(){

  var access_token = new URLSearchParams(window.location.hash).get('access_token');

  const [customerID, setcustomerID] = useState("");
  const [orderInfo, setorderInfo] = useState("");
  const [orderID, setOrderID] = useState("");
  const [email, setEmail] = useState("");

  //fetch the email from the Cognito API
  fetch('https://cognito-idp.us-west-2.amazonaws.com', {
    headers: {'Content-Type': 'application/x-amz-json-1.1', 'X-Amz-Target': 'AWSCognitoIdentityProviderService.GetUser'},
    method: 'POST',
    body: JSON.stringify({'AccessToken': access_token})
  }).then(response => {
    return response.json();
  }).then(body => {
    var theEmail = body["UserAttributes"][2]["Value"];
    setEmail("Welcome " + theEmail.substring(0, theEmail.lastIndexOf("@")));
  }).catch(error => {
    console.log(error);
    setEmail("Login/Sign Up");
  });
   
  //send payload and headers to aws api gateway to send data to the database
  const submit = (e) => {
    e.preventDefault();
    fetch('https://q4ooc4j5ib.execute-api.us-west-2.amazonaws.com/dev/orders', {
        headers: {'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({customerID, orderID, orderInfo}),
      })
      .then(response => {console.log(response);
        if(response.status !== 200){
          alert("Looks like you need to sign in before ordering")
        } else{
          alert("Thank you for ordering!")
        }})
      .catch(error => {console.log(error); alert("An error occured, please try again after signing in")});
    }

  const sign_in_link = 'https://restuarantordering.auth.us-west-2.amazoncognito.com/login?client_id=3707r9tfbti3hkqu17tvo0p34n&response_type=token&scope=apiAccess.com/database.read+aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://d3p7plggu38z55.cloudfront.net/';

  return(
    <div className='mainDiv'>  
       <a className='loginLink' href={sign_in_link}> {email} </a>
      <img className='mainImage' src={homeImage} alt='Background'></img>

      <h2> Order Here</h2>
      <form onSubmit={submit}>
        <h1> New Order</h1>
        <label>
          customerID:
          <input type="text" value={customerID} name="customerID" onChange={(e) => setcustomerID(e.target.value)}/>
        </label>
        <label>
          OrderID:
          <input type="text" value={orderID} name="customerID" onChange = {(e) => setOrderID(e.target.value)}/>
        </label>
        <label>
          What would you like to order?
          <input type="text" value={orderInfo} name="orderInfo" onChange={(e) => setorderInfo(e.target.value)}/>
        </label>
        <input onClick={submit} className='submitButton' type="submit" value="Submit" />
      </form>

      <div className='row'>

        <div className='column'>
          <div className='card'>
            <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
          <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
          <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
          <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
          <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
          <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
          <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
          <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

        <div className='column'>
          <div className='card'>
          <h3> Something</h3>
            <p>Hello1</p>
            <p>hello2</p>
            <p>hello3</p>
          </div>
        </div>

      </div>

    </div>

  );
}

export default Home;