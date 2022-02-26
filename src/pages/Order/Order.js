import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import "./Order.css";

function Order(){

  var access_token = new URLSearchParams(window.location.hash).get('access_token');

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [id, setid] = useState("");
  const [order, setorder] = useState("");
   
  const submit = (e) => {
    e.preventDefault();
    fetch('https://sxxkg99jqi.execute-api.us-west-2.amazonaws.com/orders', {
        method: 'PUT',
        body: JSON.stringify({firstname, lastname, id, order})
      })
  }

  let history = useHistory();

  function buttonClicked(){
    history.push('/Success');
  }

  return (
    <body>
      <form onSubmit={submit}>
        <h1> New Order</h1>
        <label>
          First Name:
          <input type="text" value={firstname} name="firstname" onChange={(e) => setfirstname(e.target.value)}/>
        </label>
        <label>
          Last Name:
          <input type="text" value={lastname} name="lastname" onChange={(e) => setlastname(e.target.value)}/>
        </label>
        <label>
          ID:
          <input type="text" value={id} name="id" onChange={(e) => setid(e.target.value)} />
        </label>
        <label>
          What Would You Like to Order?
          <select className='dropDown' name='order' value={order} onChange={(e) => setorder(e.target.value)}>
            <option value='pepperoni pizza 15$'>Pepperonni Pizza 15$</option>
            <option value='cheese pizza 15$'>Cheese Pizza 15$</option>
            <option value='three cheese pizza 15$'>Three Cheese Pizza 15$</option>
          </select>
        </label>
        <input onClick={buttonClicked} className='submitButton' type="submit" value="Submit" />
      </form>
    </body>
  );
}

export default Order;
