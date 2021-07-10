import React, { useContext, useState, useEffect } from "react";
import { TaskContext } from "../../context/TaskProvider";
import { ModeContext } from "../../context/ModeProvider";
import Task from "../task/Task";
import "./taskList.css";
import Swal from "sweetalert2";
const TaskList = () => {
  const { tasks, setTasks, filterArray } = useContext(TaskContext);
  const { darkMode } = useContext(ModeContext);

  const [tasksLeft, setTasksLeft] = useState(tasks);
  const [selectAll, setSelectAll] = useState(true);
  useEffect(() => {
    const newArray = tasks.filter((task) => task.done === false);
    setTasksLeft(newArray);
  }, [tasks]);

  const handleDeletedChecked = () => {
    if (tasksLeft.length !== tasks.length) {
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
          const newTasks = tasks.filter((task) => task.done === false);
          setTasks(newTasks);
          localStorage.setItem("tasks", JSON.stringify(newTasks));
          Swal.fire("Deleted!", "", "success");
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Not to do selected",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSelectAllItems = () => {
    const allItems = [...tasks];
    allItems.forEach((task) => {
      task.done = selectAll;
    });
    setTasks(allItems);
    localStorage.setItem("tasks", JSON.stringify(allItems));
    setSelectAll(!selectAll);
  };

  return (
    <div
      className="tasks_box_container"
      style={{
        background: darkMode && "hsl(235, 24%, 19%)",
        color: darkMode && "white",
      }}
    >
      {tasks.length !== 0 ? (
        <ul className="tasks_container">
          {filterArray.map((item, index) => (
            <Task key={item.id} item={item} index={index} />
          ))}
          <li className="task_item_footer">
            <p
              style={{
                color: darkMode && "white",
              }}
            >{`${tasksLeft.length} items left`}</p>
            <div
              className="buttons_footer_box"
              style={{
                color: darkMode && "white",
              }}
            >
              <button
                onClick={() => handleSelectAllItems(tasks)}
                style={{
                  color: !selectAll && "blue",
                  fontSize: !selectAll && "15px",
                  textShadow:
                    !selectAll && "1px 1px 1px rgba(255, 255, 255, 0.33)",
                }}
              >
                All
              </button>
              <button
                onClick={() => handleDeletedChecked(tasks)}
                style={{
                  color: darkMode && "white",
                }}
              >
                Clear selected
              </button>
            </div>
          </li>
        </ul>
      ) : (
        <div className="tasks_container"> Not to do yet...</div>
      )}
    </div>
  );
};

export default TaskList;
