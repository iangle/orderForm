import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';


function Order(){

  var access_token = new URLSearchParams(window.location.hash).get('access_token');

  console.log(access_token);

  const [customerID, setcustomerID] = useState("");
  const [orderInfo, setorderInfo] = useState("");
  const [orderID, setOrderID] = useState("");

  let history = useHistory();
   
  const submit = (e) => {
    e.preventDefault();
    fetch('https://q4ooc4j5ib.execute-api.us-west-2.amazonaws.com/dev/orders', {
        headers: {'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({customerID, orderID, orderInfo}),
      })
      .then(response => {console.log(response)})
      .catch(error => {console.log(error)});

      history.push('/Success');
    }

  function buttonClicked(){
    history.push('/Success');
  }

  return (
    <body>
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
    </body>
  );
}

export default Order;
