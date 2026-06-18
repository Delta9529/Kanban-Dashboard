import React, { useEffect, useState } from 'react';
import TaskComponent from './Components/taskform/TaskForm';
import TaskCol from './Components/taskColumn/TaskColumn';
import Todo from './assets/direct-hit.png';
import deleteicon from './assets/delete.png';
import './App.css';

const API = 'https://kanban-dashboard-spo7.onrender.com/api';

function App() {
  const [task, setTask] = useState([]);

  // Load tasks from backend on page load
  useEffect(() => {
    fetch(`${API}/tasks`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => console.error('Failed to load tasks:', err));
  }, []);

  // Add task - called from TaskForm
  const addTask = async (taskData) => {
    try {
      const res = await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const newTask = await res.json();
      // Update state immediately with the task returned from the backend
      setTask((prev) => [...prev, newTask]);
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };



  // Delete task by id
  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
      setTask((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <div className="App">
      <TaskComponent setTask={addTask} />
      <main className='main_app'>
        <TaskCol taskname='To do'  icon={Todo}       task={task} status="todo"  handleDelete={handleDelete} />
        <TaskCol taskname='Done'   icon={deleteicon} task={task} status="done"  handleDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;