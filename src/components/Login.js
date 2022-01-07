import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({setToken, action}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
          username,
          password,
        }).then(s => setToken(s));
        action()
      }


    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="add-form">
                <h3>Login</h3>
                <div className="form-control">
                    <label>username</label>
                    <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)}/>
                </div>
                <div className="form-control">
                    <label>password</label>
                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} className="form-control"/>
                </div>
                <div class="loginButtons">
                    <input type="submit" value="Login" className="btn"/>
                    <input type="submit" value="Register" className="btn"/>
                </div>
            </form>
        </div>
    )
}

async function loginUser(credentials) {
    return fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .then(data => {return data})
      .catch(e => console.log(e))
   }

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

export default Login
