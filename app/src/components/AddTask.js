import { useState } from "react";
import Button from "./Button";

const AddTask = ({ onSubmitForm, setToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitForm({ title, description, isCompleted });

    setTitle("");
    setDescription("");
    setIsCompleted(false);
  };

  const logout = () => {
    setToken("");
  };

  return (
    <>
        <div className="formHeader">
          <h2>Add a task</h2>
          <Button
            onClick={logout}
            color="black"
            text="Log Out"
          />
        </div>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            value={title}
            type="text"
            placeholder="Task title"
            onChange={(e) => setTitle(e.target.value)}
            id="inputTitle"
          />
        </div>
        <div className="form-control">
          <label>Description</label>
          <input
            value={description}
            type="text"
            placeholder="Task description"
            onChange={(e) => setDescription(e.target.value)}
            id="inputDescription"
          />
        </div>
        <div className="padLeft form-control form-control-check">
          <label>Is Completed</label>
          <input
            value={isCompleted}
            type="checkbox"
            onChange={(e) => setIsCompleted(e.currentTarget.checked)}
            id="inputCompleted"
          />
        </div>

        <input
          type="submit"
          value="Add Task"
          className="form-control input btn btn-block"
        />
      </form>
    </>
  );
};

export default AddTask;
