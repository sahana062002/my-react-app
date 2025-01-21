import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [showCard, setShowCard] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleAddTask = () => {
    setShowCard(true);
    setNewTask({ title: "", description: "" });
    setCurrentTaskIndex(null);
  };

  const handleSave = () => {
    if (currentTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = newTask;
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    setNewTask({ title: "", description: "" });
    setShowCard(false);
  };

  const handleCancel = () => {
    setNewTask({ title: "", description: "" });
    setShowCard(false);
  };

  const handleDelete = (index) => {
    setCurrentTaskIndex(index);
    setDialogMessage("Are you sure you want to delete this task?");
    setShowDialog(true);
  };

  const confirmDelete = () => {
    const updatedTasks = tasks.filter((_, i) => i !== currentTaskIndex);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowDialog(false);
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  return (
    <div className="App">
      {showCard && <div className="overlay"></div>}
      <div className={`container ${showCard ? "blurred" : ""}`}>
        <div className="task-list">
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="button-group">
                  <button
                    onClick={() => {
                      setNewTask(task);
                      setCurrentTaskIndex(index);
                      setShowCard(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">
          <h1>Task Manager</h1>
          <button onClick={handleAddTask}>Add a Task</button>
        </div>
      </div>

      {showCard && (
        <div className="card">
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) =>
              setNewTask({ ...newTask, title: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          ></textarea>

          <div className="button-container">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {showDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <p>{dialogMessage}</p>
            <div className="dialog-buttons">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
