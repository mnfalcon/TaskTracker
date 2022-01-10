import Button from "./Button";
import AddTask from "./AddTask"

import { useState, useEffect } from 'react'

const Task = ({ task, onDelete, onEdit}) => {
  // id, username, title, description, isCompleted
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const elementId = "key" + task.id;
//   const isCompleted = task.isCompleted;
  const [showEditForm, setShowEditForm] = useState(false);
  const [EditButtonText, setEditButtonText] = useState("Edit")

  const EditTask = async (e) => {
      e.preventDefault()
    let title = document.getElementById('inputTitle' + task.id).value
    let description = document.getElementById('inputDescription' + task.id).value
    let isCompleted = document.getElementById('inputCompleted' + task.id).checked

      const res = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: JSON.parse(sessionStorage.getItem("token")).token,
        },
        body: JSON.stringify({title, description, isCompleted}),
      });
      onEdit()
      displayForm()
  }

  const displayForm = () => {
    if (!showEditForm){
        setEditButtonText("Cancel")
    }
    else {
        setEditButtonText("Edit")
    }
    setShowEditForm(!showEditForm)
  }

  let form = (<form className="add-form" onSubmit={EditTask}>
  <div className="form-control">
    <label>Title</label>
    <input
      value={title}
      type="text"
      placeholder="Task title"
      onChange={(e) => setTitle(e.target.value)}
      id={"inputTitle" + task.id}
    />
  </div>
  <div className="form-control">
    <label>Description</label>
    <input
      value={description}
      type="text"
      placeholder="Task description"
      onChange={(e) => setDescription(e.target.value)}
      id={"inputDescription" + task.id}
    />
  </div>
  <div className="padLeft form-control form-control-check">
    <label>Is Completed</label>
    <input
      value={isCompleted}
      type="checkbox"
      onChange={(e) => setIsCompleted(e.currentTarget.checked)}
      id={"inputCompleted" + task.id}
    />
  </div>

  <input
    type="submit"
    value="Edit Task"
    className="form-control input btn btn-block"
  />
</form>)

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
            <Button color="black" text={EditButtonText} onClick={displayForm} />
          </div>
        </div>
        <p>{task.description}</p>
        {showEditForm ? form : ""}
      </div>

    </>
  );
};

export default Task;
