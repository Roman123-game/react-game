import React from 'react';
import"./card.css"
const Card = ({ value, suit }) => {
  return (
    <div className="card">
      <div className={`suit ${suit}`}>{suit}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default Card;