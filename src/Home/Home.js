import React, { Component } from 'react';
import history from './../history';
import "./Home.css";

export default class Home extends Component {
  
    constructor(props) {
      super(props);
      this.state = 
      { 
        firstname: '',
        lastname: '',
        id: '',
        order: '',
        errors: {
          firstname: '',
          lastname: '',
          id: '',
          order: '',
        }
      };
    }

    

    /*handleValidation(){
      let value = this.state.value;
      let formIsValid = true;

      if (!value["firstname"]) {
        formIsValid = false;
       // errors["name"] = "Cannot be empty";
      }

      return formIsValid;
    }*/
   
    handleChange = (event) => {

      const { name, value } = event.target;
      let errors = this.state.errors;

      switch (name) {
        case 'firstname': 
          errors.fullName = 
            value.length < 1
              ? 'First name is a required field'
              : '';
          break;
        case 'lastname': 
          errors.password = 
            value.length < 1
              ? 'Last name is a required field'
              : '';
          break;
          case 'id': 
          errors.password = 
            value.length < 1
              ? 'ID is a required field'
              : '';
          break;
        default:
          break;
      }

      this.setState({[event.target.name]: event.target.value});
    }
   
    handleSubmit = (event) => {
      
      //alert('Thank you for submitting your order! ');
   
      fetch('https://sxxkg99jqi.execute-api.us-west-2.amazonaws.com/items', {
          method: 'PUT',
          // We convert the React state to JSON and send it as the POST body
          body: JSON.stringify(this.state)
        }).then(function(response) {
          console.log(response)
          return response.json();
        });
   
      event.preventDefault();
  }
   
  render() {
    return (
      <div className='Home' location={this.props.location}>
      <body>
        <form onSubmit={this.handleSubmit}>
          <h1> New Order</h1>
          <label>
            First Name:
            <input type="text" value={this.state.value} name="firstname" onChange={this.handleChange} />
          </label>
          <label>
            Last Name:
            <input type="text" value={this.state.value} name="lastname" onChange={this.handleChange} />
          </label>
          <label>
            ID:
            <input type="text" value={this.state.value} name="id" onChange={this.handleChange} />
          </label>
          <label>
            What Would You Like to Order?
            <select className='dropDown' name='order' value={this.state.value} onChange={this.handleChange}>
              <option value='pepperoni pizza 15$'>Pepperonni Pizza 15$</option>
              <option value='cheese pizza 15$'>Cheese Pizza 15$</option>
              <option value='three cheese pizza 15$'>Three Cheese Pizza 15$</option>
            </select>
          </label>
          <input onClick={() => history.push('/Submit')} className='submitButton' type="submit" value="Submit" />
        </form>
      </body>
      </div>
    );
  }
}
