import React, { useState, useEffect } from 'react';
import Card from './Card';
import"./deck.css"

const Deck = () => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const newDeck = [];
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    suits.forEach(suit => {
      values.forEach(value => {
        newDeck.push({ value, suit });
      });
    });
    setDeck(newDeck);
  }, []);

  return (
    <div className="deck">
      {deck.map(card => (
        <Card key={`${card.suit}-${card.value}`} value={card.value} suit={card.suit} />
      ))}
    </div>
  );
};

export default Deck;
