import React, {useState} from "react";
import loginImg from "../../login.svg";
import './Register.scss'

const Register = ( {registerUser} ) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
    <div className="base-container">
    <div className="header">Register</div>
    <div className="content">
        <div className="image">
        <img alt='Register Logo' src={loginImg} />
        </div>
        <div className="form">
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" value={username} name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" value={password} name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        </div>
    </div>
    <div className="footer">
        <button type="button" className="btn" onClick={() => registerUser(username, password)}>
        Register
        </button>
    </div>
    </div>
    );
}

export default Register