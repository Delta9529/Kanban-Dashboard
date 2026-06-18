import React from "react";
import './taskCol.css'
import TaskCard from "../Card/Card";

export default function TaskCol({ icon, taskname, task, status, handleDelete }) {
  return (
    <section className='task_column'>
      <h1 className='task_column_heading'>
        <img className="task_column_icon" src={icon} alt="icon" />
        {taskname}
      </h1>
      {task.map((t) =>
        t.status === status && (
          <TaskCard
            key={t.id}
            id={t.id}         // pass DB id down
            title={t.task}
            // tags={t.tags}
            handleDelete={handleDelete}
          />
        )
      )}
    </section>
  );
}