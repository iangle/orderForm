import React, {useState, useEffect} from 'react'

import {Products, Navbar} from './components'

const App = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch('https://w9rdt5h82l.execute-api.us-west-2.amazonaws.com/Prod/product')
      .then(response => {
        console.log(response);
        if(response.status !== 200){
          console.log("an error occured when retrieving the payload")
        } else{
          console.log("successfully retrieved payload")
        }

        return response;
      })
      .catch(error => {console.log(error);});

      const data = await response.json();

      setProducts(data.products);
    }

    getProducts();
  }, []);

  return (
    <div> 
      <Navbar />
      <Products products={products}/> 
      </div>
  )
}

export default App