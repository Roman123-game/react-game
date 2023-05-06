import React, { useState} from 'react';
import './card.css'
import cardFront from '../images/card-front.png'


const Card = (props) => {
  const { word, index, handleCardClick }=  props
  const [isFlipped, setIsFlipped] = useState(true);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
    handleCardClick(index);
  };

  return (
    <div className={`card ${isFlipped ? 'flip' : ''}`} onClick={handleFlipCard}>
      {isFlipped ?
      <div className="card-front"><img src={cardFront} alt="" /></div> 
      :
      <div className="card-back"><p>{word}</p></div>}

    </div>
  );
};

export default Card;