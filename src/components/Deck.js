import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Deck.css";

const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = ["♠", "♣", "♥", "♦"];
const TOTAL_CARDS = RANKS.length * SUITS.length;

const StackTheDeck = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const newCards = [];
    for (let i = 0; i < TOTAL_CARDS; i++) {
      const rank = RANKS[i % RANKS.length];
      const suit = SUITS[Math.floor(i / RANKS.length)];
      newCards.push({
        id: i,
        rank,
        suit,
        isFaceUp: false,
      });
    }
    setCards(newCards);
  }, []);

  const handleClick = (id) => {
    const selectedCard = cards.find((card) => card.id === id);
    const updatedCards = [...cards];
    const updatedSelectedCards = [...selectedCards];

    if (selectedCard.isFaceUp) {
      setSelectedCards(updatedSelectedCards.filter((card) => card.id !== id));
    } else {
      updatedSelectedCards.push(selectedCard);
      setSelectedCards(updatedSelectedCards);
    }

    updatedCards.forEach((card) => {
      if (updatedSelectedCards.includes(card)) {
        card.isFaceUp = true;
      } else {
        card.isFaceUp = false;
      }
    });

    setCards(updatedCards);

    if (updatedSelectedCards.length === 3) {
      const isMatch =
        updatedSelectedCards[0].rank === updatedSelectedCards[1].rank &&
        updatedSelectedCards[1].rank === updatedSelectedCards[2].rank;
      setIsGameOver(isMatch);
    }
  };

  const handleRestart = () => {
    setCards(cards.map((card) => ({ ...card, isFaceUp: false })));
    setSelectedCards([]);
    setIsGameOver(false);
  };

  return (
    <div className="stack-the-deck">
      <div className="stack">
        {cards.map((card) => (
          <Card
            key={card.id}
            rank={card.rank}
            suit={card.suit}
            isFaceUp={card.isFaceUp}
            onClick={() => handleClick(card.id)}
          />
        ))}
      </div>
      <div className="hand">
        {selectedCards.map((card) => (
          <Card
            key={card.id}
            rank={card.rank}
            suit={card.suit}
            isFaceUp={true}
            onClick={() => handleClick(card.id)}
          />
        ))}
        {selectedCards.length < 3 && <div className="placeholder"></div>}
      </div>
      {isGameOver && (
        <div className="game-over">
          <p>Congratulations, you won!</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default StackTheDeck;
