import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import { TaskContext } from "../../context/TaskProvider";
import { ModeContext } from "../../context/ModeProvider";
import PopUpFacts from "../pop-up/PopUpFacts";

import darkImage from "../../assets/images/bg-mobile-dark.jpg";
import lightImage from "../../assets/images/bg-mobile-light.jpg";
import moon from "../../assets/images/icon-moon.svg";
import sun from "../../assets/images/icon-sun.svg";
import "./header.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faSearch } from "@fortawesome/free-solid-svg-icons";

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

    setFilterArray,
    showPopUp,
    setShowPopUp,
  } = useContext(TaskContext);

  //----------------------------COMPONENTS STATES---------------------------------------------------//

  const [checked, setChecked] = useState(false);
  const [limit, setLimit] = useState("");

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
      localStorage.setItem("tasks", JSON.stringify(newArrayTasks));
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

  const handleShowPopUp = () => {
    setShowPopUp(true);
  };

  const handleAddFacts = async (e, limit) => {
    e.preventDefault();
    if (limit.trim() && limit <= 300 && limit !== "0") {
      try {
        const res = await axios.get(
          `https://catfact.ninja/facts?limit=${limit}&max_length=140`
        );
        const catFacts = res.data.data;
        let newArray = [];
        console.log(catFacts);
        catFacts.forEach((el) =>
          newArray.push({
            done: false,
            id: generateRandomId(),
            task: el.fact,
          })
        );
        setTasks([...tasks, ...newArray]);
        localStorage.setItem("tasks", JSON.stringify([...tasks, ...newArray]));
        console.log(tasks);
        Swal.fire({
          icon: "success",
          title: "Cat facts added to your list",
        });
        setLimit("");
        setShowPopUp(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Out of range",
        text: "Please type a valid number!",
      });
      setLimit("");
    }
  };

  useEffect(() => {
    setFilterArray(...tasks);

    const newArray = tasks.filter((el) =>
      el.task.includes(filterTask.toLowerCase())
    );
    setFilterArray(newArray);
  }, [filterTask, tasks, setFilterArray]);

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
      <div className="title-header-box">
        {edit ? (
          <h3 className="title-session">Edit to-do</h3>
        ) : (
          <h3 className="title-session">Add a new to-do</h3>
        )}
        <div className="genearte-facts-box">
          <FontAwesomeIcon className="icon" icon={faCat} />
          <button className="btn btn-light" onClick={() => handleShowPopUp()}>
            Generate cat facts
          </button>
        </div>
      </div>
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
      <div className="filter-task-container">
        <FontAwesomeIcon icon={faSearch} />
        <input
          value={filterTask}
          onChange={(e) => setFilterTask(e.target.value)}
          type="text"
          className="filter-task"
          placeholder="find to-do..."
        />
      </div>

      {showPopUp ? (
        <PopUpFacts
          limit={limit}
          setLimit={setLimit}
          handleAddFacts={handleAddFacts}
          setShowPopUp={setShowPopUp}
        />
      ) : null}
    </div>
  );
};

export default Header;
