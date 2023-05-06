import React, { useState, useEffect } from 'react';
import './game.css'
import Card from './Card'

const words =[
  "apple",
  "banana",
  "cherry",
  "grape",
  "kiwi",
  "lemon",
  "orange",
  "peach",
  "pear",
  "pineapple",
  "plum",
  "raspberry",
  "strawberry",
  "watermelon",
];


const Game = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);


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
        console.log("card matched")
        setMatchedCards([...matchedCards, card1]);
      }
      else if (newSelectedCards.length === 2) {
        console.log("selectedcardfunc")
        setTimeout(setSelectedCards([]), 1000);
      }
    }
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
      <h1>Memo Game</h1>
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
