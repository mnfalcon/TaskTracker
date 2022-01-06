import React, { useState } from 'react';
import PropTypes from 'prop-types';
import App from "../App"

const Login = ({setToken}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
          username,
          password,
        }).then(s => setToken(s));
      }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>username</label>
            <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)}/>
            <label>password</label>
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
            <input type="submit"/>
        </form>
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
