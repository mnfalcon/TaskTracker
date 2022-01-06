import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import React, { useState } from "react"
import useToken from './useToken';

function App() {
//   let token = getToken()
  //const [token, setToken] = useState();
  const { token, setToken } = useToken();
    console.log(token)
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <div className="container">
        <h1>Task Tracker</h1>
        <BrowserRouter>
          <Routes>

            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken))
  getToken()
}

function getToken() {
  const tokenString = sessionStorage.getItem("token")
  const userToken = JSON.parse(tokenString)
  console.log("getting token")
  return userToken?.token
}

export default App;
