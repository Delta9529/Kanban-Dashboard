import React, { useState } from "react";
import './taskform.css'

export default function TaskComponent({ setTask }) {
    const [taskData, setTaskData] = useState({
        task: '',
        status: 'todo'
        // tags: []
    });

    // const selectTag = (tag) => {
    //     if (taskData.tags.some(item => item === tag)) {
    //         const filtertag = taskData.tags.filter(item => item !== tag);
    //         setTaskData(prev => ({ ...prev, tags: filtertag }));
    //     } else {
    //         setTaskData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    //     }
    // }

    // const selected = (tag) => {
    //     return taskData.tags.some(item => item === tag);
    // }

    const handleTaskInput = (e) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskData.task.trim()) return;

        // Wait for the task to be saved to the backend first
        await setTask(taskData);

        // Then reset the form
        setTaskData({ task: '', status: 'todo' });
    }

    return (
        <header className="App-header">
            <form onSubmit={handleSubmit}>
                <input
                    className='task_input'
                    value={taskData.task}
                    type="text"
                    name="task"
                    placeholder="Enter your task"
                    onChange={handleTaskInput}
                />
                <div className="taskform_bottom_line">
                    <div>
                        <select className="task_status" value={taskData.status} name="status" onChange={handleTaskInput}>
                            <option>Select One Option</option>
                            <option value={'todo'}>To do</option>
                            <option value={'done'}>Done</option>
                        </select>
                        <button className="Add_button">Add Task</button>
                    </div>
                </div>
            </form>
        </header>
    )
}