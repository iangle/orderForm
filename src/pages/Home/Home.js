import React from 'react';
import homeImage from '../../Images/homePageFoodImage.jpg';
import {useHistory} from 'react-router-dom';
import './Home.css'

function Home(){

  let history = useHistory();

  function linkClicked(){
    history.push('/Order');
  }

  return(
    <div className='mainDiv'>  
      <button class="button" className='loginLink' onClick={linkClicked}> Login/Sign Up</button>
      <img className='mainImage' src={homeImage} alt='Background'></img>
    </div>

  );
}

export default Home;