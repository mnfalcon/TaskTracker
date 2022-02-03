import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button'

const Login = ({setToken, action}) => {
    const [username, setUserName] = useState("");
    const [usernameCheck, setUserNameCheck] = useState("");
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [email, setEmail] = useState();
    const [showRegister, setShowRegister] = useState(false);
    const [toggleRegisterForm, setRegisterButtonText] = useState("Create an account")
    const [passwordsCheck, setPasswordsCheck] = useState("")

    const handleSubmitLogin = async e => {
        e.preventDefault();
        await loginUser({
          username,
          password,
        }).then(s => setToken(s));
        action()
      }

      const handleSubmitRegister = async e => {
        // e.preventDefault();
        if (username === "" || username.length < 4){
          setUserNameCheck("Please provide a valid username. Length > 4")
          return
        }

        if (password === password2 && password.length > 5) {
          setPasswordsCheck("")
           await registerUser({
            username,
            email,
            password,
          }).then(s => 
              setToken(s));
          action()
        }
        else {
          setPasswordsCheck("Passwords don't match or Length < 4!")
        }

      }

      const displayRegister = () =>{
          if (!showRegister){
            setRegisterButtonText("Already have an account? Log in")
          }
          else {
              setRegisterButtonText("Create an account")
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
            <Button text={toggleRegisterForm} onClick={displayRegister} />
        </div>
    </form>)

        let b = (<form onSubmit={handleSubmitRegister} className="add-form">
        <h3>Register</h3>
        <div className="form-control">
            <label>username</label>
            <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)}/>
            <p style={{color: "red"}} >{usernameCheck}</p>
        </div>
        <div className="form-control">
            <label>email</label>
            <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="form-control">
            <label>password</label>
            <input type="password" placeholder="password" onChange={e => {setPassword(e.target.value)}} className="form-control"/>
        </div>
        <div className="form-control">
            <label>re-enter password</label>
            <input type="password" placeholder="password" onChange={e => {setPassword2(e.target.value)}} className="form-control"/>
            <p style={{color: "red"}} >{passwordsCheck}</p>
        </div>
        <div className="loginButtons">
            <Button text="Register" onClick={handleSubmitRegister}/>
            <Button text={toggleRegisterForm} color="#295D8A" onClick={displayRegister} />
        </div>
    </form>)
    

    return (
        <div className="container" id="loginForm">
            <h4 style={{color: "red"}}>Warning</h4>
            <p style={{color: "red", fontWeight: "bold"}}>This is a work in progress and a learning project. Please do not input any sensitive information.</p>
            {showRegister ? b : a}
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
