import Task from "./Task";
import { useState, useEffect } from "react";

const Home = ({tasks, deleteTaskFunc, editTaskFunc}) => {

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task} 
          onDelete={deleteTaskFunc}
          onEdit={editTaskFunc}
        />
      ))}
    </div>
  );
};

export default Home;
