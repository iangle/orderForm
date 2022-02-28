import React from 'react';
import homeImage from '../../Images/homePageFoodImage.jpg';
import {Button, Card} from "react-bootstrap";
import './Home.css'

function Home(){

  const sign_in_link = 'https://restuarantordering.auth.us-west-2.amazoncognito.com/login?client_id=3707r9tfbti3hkqu17tvo0p34n&response_type=token&scope=apiAccess.com/database.read+aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http://localhost:3000/Order';

  return(
    <div className='mainDiv'>  
       <a className='loginLink' href={sign_in_link}> Login/Sign Up</a>
      <img className='mainImage' src={homeImage} alt='Background'></img>

      <Card className="cards">
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>

  );
}

export default Home;