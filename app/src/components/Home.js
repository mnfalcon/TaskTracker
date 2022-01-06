import React from 'react'

const Home = () => {
    console.log(fetchTasks())
    return (
        <div>
            
        </div>
    )
}

async function fetchTasks() {
    return await fetch('http://localhost:8080/api/tasks', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': JSON.parse(sessionStorage.getItem('token')).token,
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Connection': 'keep-alive'
      }
    })
      //.then(data => data.json())
      .then(data => {
          //data.json()  
          //console.log(data[0])
        return data.json()})
      .catch(e => console.log(e))
   }

export default Home
