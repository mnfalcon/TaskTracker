import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({setToken, action}) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [showRegister, setShowRegister] = useState(false);
    const [toggleRegisterForm, setRegisterButtonText] = useState("Register")

    const handleSubmitLogin = async e => {
        e.preventDefault();
        await loginUser({
          username,
          password,
        }).then(s => setToken(s));
        action()
      }

      const handleSubmitRegister = async e => {
        e.preventDefault();
        const res = await registerUser({
          username,
          email,
          password,
        }).then(s => 
            setToken(s));
        action()

      }

      const displayRegister = () =>{
          if (!showRegister){
              setRegisterButtonText("Collapse Register form")
          }
          else {
            setRegisterButtonText("Register")
          }
          setShowRegister(!showRegister)
    }

    let a = ( 
    <form onSubmit={handleSubmitLogin} className="add-form">
        <h3>Login</h3>
        <div className="form-control">
            <label>username</label>
            <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)}/>
        </div>
        <div className="form-control">
            <label>password</label>
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} className="form-control"/>
        </div>
        <div className="loginButtons">
            <input type="submit" value="Login" className="btn"/>
            <input type="button" value={toggleRegisterForm} className="btn" onClick={displayRegister} />
        </div>
    </form>)

        let b = (<form onSubmit={handleSubmitRegister} className="add-form">
        <h3>Register</h3>
        <div className="form-control">
            <label>username</label>
            <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)}/>
        </div>
        <div className="form-control">
            <label>email</label>
            <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="form-control">
            <label>password</label>
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} className="form-control"/>
        </div>
        <div className="loginButtons">
            <input type="submit" value="Register" className="btn"/>
        </div>
    </form>)
    

    return (
        <div className="container" id="loginForm">
            {a}
            {showRegister ? b : ""}
        </div>
    )
}

async function loginUser(credentials) {

    return fetch('/api/login', {
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

   async function registerUser(credentials) {
    return fetch('/api/register', {
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
