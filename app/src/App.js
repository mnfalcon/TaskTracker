import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState, useEffect } from 'react'
import Home from "./components/Home"
import Login from "./components/Login"
import useToken from './useToken';
import AddTask from './components/AddTask'

function App() {

  const { token, setToken } = useToken();
  
  
  if (!token) {
      return <Login setToken={setToken} />;
    }
    
    console.log(JSON.parse(sessionStorage.getItem('token')).token)


    const addTask = async (task) => {
        const res = await fetch('http://localhost:8080/api/tasks', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'Authorization': getToken()
          },
          body: JSON.stringify(task),
        })

    }

    
  return (
    <>
        <BrowserRouter key="main" id="main">
      <div className="container">
        <h1>Task Tracker</h1>
        <AddTask onSubmitForm={addTask}/>
          <Routes>

            <Route path="/" element={<Home />} />
          </Routes>
      </div>
        </BrowserRouter>
    </>
  );
}

function getToken() {
  const tokenString = sessionStorage.getItem("token")
  const userToken = JSON.parse(tokenString)
  console.log("getting token")
  return userToken?.token
}


export default App;
