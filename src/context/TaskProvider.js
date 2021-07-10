import React, { createContext, useState, useEffect } from "react";
export const TaskContext = createContext();
const TaskProvider = (props) => {
  const [task, setTask] = useState("");
  const [filterTask, setFilterTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [idTask, setIdTask] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [filterArray, setFilterArray] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      const tasksStorage = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasksStorage);
      return;
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        edit,
        setEdit,
        task,
        setTask,
        idTask,
        setIdTask,
        filterTask,
        setFilterTask,

        filterArray,
        setFilterArray,
        showPopUp,
        setShowPopUp,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
