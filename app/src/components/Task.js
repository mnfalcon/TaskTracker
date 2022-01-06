import Button from "./Button";

import { useState, useEffect } from 'react'

const Task = ({ task }) => {
  // id, username, title, description, isCompleted
  const elementId = "key" + task.id;
  const isCompleted = task.isCompleted;
  const [status, setStatus] = useState()

  const Delete = async (id) => {
    console.log(JSON.parse(sessionStorage.getItem("token")).token);
    const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: JSON.parse(sessionStorage.getItem("token")).token,
      },
    });
    let k = await res.ok
    if (k) {
        setStatus(k)
    }
  };

  return (
    <>
      <div className="task" key={elementId} id={elementId}>
        <div className="taskContainer">
          <input
            className="form-control form-control-check"
            defaultChecked={isCompleted}
            type="checkbox"
          />
          <h3>{task.title}</h3>
          <div className="buttonsContainer">
            <Button
              color="darkred"
              text="Delete"
              onClick={() => Delete(task.id)}
            />
            <Button color="black" text="Edit" onClick={() => Delete(task.id)} />
            {console.log(task.id)}
          </div>
        </div>
        <p>{task.description}</p>
      </div>
    </>
  );
};

export default Task;
