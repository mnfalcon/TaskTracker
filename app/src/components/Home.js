import Task from './Task'
import { useState, useEffect } from 'react'


const Home = () => {
    // const tasks = await fetchTasks()
    // console.log(tasks)

    // for(let i = 0; i < tasks.length; i++) {
    //     // <Task id={tasks[i].id} username={tasks[i].username} title={tasks[i].title} description={tasks[i].description} isCompleted={tasks[i].isCompleted} />
    //     console.log(tasks[i])
    // }
    const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

    tasks.map((task) => console.log(task))

    return (
        <div>{
            tasks.map((task) => <Task key={task.id} task={task}/*key={task.id} username={tasks.username} title={tasks.title} description={tasks.description} isCompleted={tasks.isCompleted}*/ />)
        }
        </div>
    )
}

async function fetchTasks() {
    let rawData = await fetch('http://localhost:8080/api/tasks', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': JSON.parse(sessionStorage.getItem('token')).token,
        'Content-Type': 'application/json'
      }
    })
      //.then(data => data.json())
      .then(data => {
          //data.json()  
          //console.log(data[0])
        return  data})
      .catch(e => console.log(e));
      let data = await rawData.json()
      return data
   }

// async function fetchTasks() {
//     let rawData = await fetch('http://localhost:8080/api/tasks', {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'Authorization': JSON.parse(sessionStorage.getItem('token')).token,
//         'Content-Type': 'application/json'
//       }
//     })
//       //.then(data => data.json())
//       .then(data => {
//           //data.json()  
//           //console.log(data[0])
//         return  data})
//       .catch(e => console.log(e));
//       let data = await rawData.json()
//       return data
//    }


export default Home
