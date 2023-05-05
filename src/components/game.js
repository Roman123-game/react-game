import React, { useState, useEffect } from 'react';
import './game.css'
import cardFront from '../images/card-front.png'
const words = [
  'apple',
  'banana',
  'cherry',
  'grape',
  'kiwi',
  'lemon',
  'orange',
  'peach',
  'pear',
  'pineapple',
  'plum',
  'raspberry',
  'strawberry',
  'watermelon',
];

const Card = ({ word, index, handleCardClick }) => {
  const [isFlipped, setIsFlipped] = useState(true);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
    handleCardClick(index);
    console.log("card flipped")
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

const Game = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    const shuffledWords = shuffleWords(words);
    const cardWords = [...shuffledWords, ...shuffledWords];
    const shuffledCards = shuffleCards(cardWords);
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (index) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index)) {
      const newSelectedCards = [...selectedCards, index];
      setSelectedCards(newSelectedCards);
      const card1 = cards[newSelectedCards[0]];
      const card2 = cards[newSelectedCards[1]];
      if (card1 === card2) {
        setMatchedCards([...matchedCards, card1]);
      }
      if (newSelectedCards.length === 2) {
        setTimeout(() => setSelectedCards([]), 1000);
      }
    }
  };

  const shuffleWords = (words) => {
    let currentIndex = words.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = words[currentIndex];
      words[currentIndex] = words[randomIndex];
      words[randomIndex] = temporaryValue;
    }

    return words;
  };

  const shuffleCards = (cards) => {
    let currentIndex = cards.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }

    return cards;
  };

  const handleNewGame = () => {
    const shuffledWords = shuffleWords(words);
    const cardWords = [...shuffledWords, ...shuffledWords];
    const shuffledCards = shuffleCards(cardWords);
    setCards(shuffledCards);
    setSelectedCards([]);
    setMatchedCards([]);
  };

  return (
    <div>
      <h1>Word Match</h1>
      <div className="game-board">
        {cards.map((word, index) => (
          <Card
            key={index}
            word={word}
            index={index}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      {matchedCards.length === words.length && (
        <div>
          <h2>Congratulations, you won!</h2>
          <button onClick={handleNewGame}>New Game</button>
        </div>
      )}
    </div>
  );
};

export default Game;
