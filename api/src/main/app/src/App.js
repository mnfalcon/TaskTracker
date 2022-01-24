import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import useToken from "./useToken";
import AddTask from "./components/AddTask";

function App() {
  const { token, setToken } = useToken();
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  useEffect(() => {
    getTasks();
  }, []);

  if (!token) {
    return <Login setToken={setToken} action={getTasks} />;
  }

  const addTask = async (task) => {
    const res = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(task),
    });
    getTasks()
  };

  const Delete = async (id) => {
    const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: JSON.parse(sessionStorage.getItem("token")).token,
      },
    });
    getTasks()
  };

  const Edit = async (id) => {
        getTasks()
        
    }
    
    
  return (
    <>
      <BrowserRouter key="main" id="main">
        <div className="container">
          <h1>Task Tracker</h1>
          <h3 className="userHello">Hello, {JSON.parse(sessionStorage.getItem("token")).username}</h3>
          <AddTask onSubmitForm={addTask} setToken={setToken}/>
          <Routes>
            <Route path="/" element={<Home tasks={tasks} deleteTaskFunc={Delete} editTaskFunc={Edit}/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

async function fetchTasks() {
  let rawData = await fetch("http://localhost:8080/api/tasks", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token")).token,
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
    if (rawData.ok){
        let data = await rawData.json();
        return data;
    }
}

export default App;
