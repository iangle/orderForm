import React, {useState} from "react";
import loginImg from "../../login.svg";
import { IconButton} from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Login.scss'

const Login = ( {loginUser} ) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const updateUser = (username, password) => {
    loginUser(username, password);
  }


    return (
    <div className="base-container" >
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img alt='Login Logo' src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
      </div>
      <div className="footer">
      <IconButton className="btn2" component={Link} to='/register' aria-label="Sign Up" color='inherit'>
          Sign Up
        </IconButton>
        <button type="button" className="btn" onClick={() => updateUser(username, password)}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login