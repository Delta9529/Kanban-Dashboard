import React from "react";
import './card.css';
import deleteicon from '../../assets/delete.png';

export default function TaskCard({ title, tags, handleDelete, id }) {
  return (
    <div className="task_card">
      <h1 className="Card_Heading">{title}</h1>
      <article className="bottom_line">
        {/* Using id from DB*/}
        <img className="deleteicon" src={deleteicon} alt="deleteicon" onClick={() => handleDelete(id)} />
      </article>
    </div>
  );
}