import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import Swal from "sweetalert2";
import "./task.css";

import { TaskContext } from "../../context/TaskProvider";
import { ModeContext } from "../../context/ModeProvider";
const Task = ({ item, index }) => {
  const { tasks, setTasks, edit, setEdit, task, setTask, idTask, setIdTask } =
    useContext(TaskContext);
  const { darkMode } = useContext(ModeContext);

  const handleDeleteTask = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTask = tasks.filter((task) => task.id !== id);
        setTasks(newTask);
        localStorage.setItem("tasks", JSON.stringify(newTask));
        Swal.fire("Deleted!", "Your to-do has been deleted.", "success");
      }
    });
  };

  const handleDoneChecked = (id) => {
    const newTasks = [...tasks];
    newTasks.forEach((task, index) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleEdit = (item) => {
    setEdit(true);
    setTask(item.task);
    setIdTask(item.id);
    console.log(item.task);
  };
  return (
    <li className="task_item">
      <div className="check_task">
        <input
          checked={item.done}
          id={item.id}
          type="checkbox"
          onChange={() => handleDoneChecked(item.id)}
        />
        <label className={item.done ? "ckecked" : null} htmlFor={item.id}>
          {item.task}
        </label>
        <div className="btns-options">
          <Link
            activeClass="active2"
            to="input-task"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <button
              className="btn btn-outline-info"
              onClick={() => handleEdit(item)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </Link>

          <button
            className="btn btn-outline-danger"
            onClick={() => handleDeleteTask(item.id)}
            style={{
              color: darkMode && "white",
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Task;
