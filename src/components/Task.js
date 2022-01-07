import Button from "./Button";
import AddTask from "./AddTask"

import { useState, useEffect } from 'react'

const Task = ({ task, onDelete, onEdit}) => {
  // id, username, title, description, isCompleted
  const elementId = "key" + task.id;
  const isCompleted = task.isCompleted;

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
              onClick={() => onDelete(task.id)}
            />
            <Button color="black" text="Edit" onClick={() => onEdit(task.id)} />
          </div>
        </div>
        <p>{task.description}</p>
      </div>

    </>
  );
};

export default Task;
