import React, { useContext, useState, useEffect } from "react";
import darkImage from "../../assets/images/bg-mobile-dark.jpg";
import lightImage from "../../assets/images/bg-mobile-light.jpg";
import moon from "../../assets/images/icon-moon.svg";
import sun from "../../assets/images/icon-sun.svg";
import "./header.css";
import Swal from "sweetalert2";
import { TaskContext } from "../../context/TaskProvider";
import { ModeContext } from "../../context/ModeProvider";
const Header = () => {
  //-------------------CONTEXT-----------------//
  const { darkMode, setDarkMode } = useContext(ModeContext);
  const {
    tasks,
    setTasks,
    edit,
    setEdit,
    task,
    setTask,
    idTask,
    filterTask,
    setFilterTask,
    filterArray,
    setFilterArray,
  } = useContext(TaskContext);

  //----------------------------COMPONENTS STATES---------------------------------------------------//

  const [checked, setChecked] = useState(false);

  /*------------------------------------HANDLES------------------------------------------------- */

  const generateRandomId = () => {
    return Math.floor(Math.random() * (10000000 - 1) + 1);
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          ...tasks,
          { id: generateRandomId(), task: task.toLowerCase(), done: false },
        ])
      );
      setTasks([
        ...tasks,
        { id: generateRandomId(), task: task.toLowerCase(), done: false },
      ]);
      setTask("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: " to do  added!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Empty field",
        text: "Please add some to-do !",
      });
      setTask("");
    }
  };

  const handleEditTasks = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newArrayTasks = tasks.map((el) =>
        el.id === idTask ? { id: el.id, done: el.done, task: task } : el
      );
      setTasks(newArrayTasks);
      setTask("");
      setEdit(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successful edit!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    setFilterArray(...tasks);

    const newArray = tasks.filter((el) =>
      el.task.includes(filterTask.toLowerCase())
    );
    setFilterArray(newArray);
  }, [filterTask, tasks]);

  useEffect(() => {
    if (!task.trim()) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checked, task]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  }, [darkMode]);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
    } else {
      localStorage.getItem("darkMode", JSON.stringify(null));
    }
  }, [darkMode, setDarkMode]);

  return (
    <div className="header" id="input-task">
      <img
        className="background_image"
        src={darkMode ? darkImage : lightImage}
        alt="bg"
      />
      <div className="title_sesion">
        <h2>TO DO</h2>
        <img
          src={darkMode ? sun : moon}
          onClick={() => handleDarkMode()}
          alt="buttonChange"
        />
      </div>
      {edit ? (
        <h3 className="title-session">Edit to-do</h3>
      ) : (
        <h3 className="title-session">Add a new to-do</h3>
      )}
      <form
        className={edit ? "add_task_sesion on-edit-mode" : "add_task_sesion"}
        onSubmit={
          !edit ? (e) => handleAddTask(e) : (e) => handleEditTasks(e, idTask)
        }
        style={{
          background: darkMode && "hsl(235, 24%, 19%)",
        }}
      >
        <div className="add-edit-box">
          <input
            style={{
              color: darkMode && "white",
            }}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            className="add_task"
            placeholder="Add a new task..."
            autoFocus={true}
          />
          {!edit ? (
            <button
              className="btn btn-outline-primary"
              onClick={(e) => handleAddTask(e)}
            >
              Add
            </button>
          ) : (
            <button
              class="btn btn-outline-info"
              onClick={(e) => handleEditTasks(e)}
            >
              Edit
            </button>
          )}
        </div>
      </form>
      <input
        style={{
          color: darkMode && "white",
        }}
        value={filterTask}
        onChange={(e) => setFilterTask(e.target.value)}
        type="text"
        className="filter-task"
        placeholder="find to-do..."
        autoFocus={true}
      />
    </div>
  );
};

export default Header;