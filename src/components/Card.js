import React, { useState } from "react";
import "./Card.css";

const Card = ({ rank, suit, isFaceUp, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(!isFaceUp);

  const handleClick = () => {
    if (isFaceUp) {
      onClick();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className={`card ${isFaceUp ? "face-up" : "face-down"} ${
        isFlipped ? "flipped" : ""
      }`}
      onClick={handleClick}
    >
      <div className="card-front">
        <div className="card-rank">{rank}</div>
        <div className="card-suit">{suit}</div>
      </div>
      <div className="card-back"></div>
    </div>
  );
};

export default Card;
