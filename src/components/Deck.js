import React, { useState, useEffect } from 'react';
import Card from './Card';
import "./deck.css"

const DECK_SIZE = 52;

const StackTheDeck = () => {
  const [deck, setDeck] = useState([]);
  const [stack, setStack] = useState([]);
  const [hand, setHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);

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

  useEffect(() => {
    if (deck.length > 0 && hand.length < 5) {
      const newHand = [...hand];
      const card = deck.pop();
      newHand.push(card);
      setHand(newHand);
      setDeck(deck);
    }
  }, [deck]);

  useEffect(() => {
    if (stack.length === DECK_SIZE) {
      setGameOver(true);
    }
  }, [stack]);

  const handleCardClick = (cardIndex) => {
    const selectedCard = hand[cardIndex];
    const topCard = stack[stack.length - 1];
    if (selectedCard.suit === topCard.suit && selectedCard.value === getNextValue(topCard.value)) {
      const newStack = [...stack];
      const newHand = [...hand];
      newStack.push(selectedCard);
      newHand.splice(cardIndex, 1);
      setStack(newStack);
      setHand(newHand);
    } else {
      alert('You cannot play that card.');
    }
  };

  const getNextValue = (value) => {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const currentIndex = values.indexOf(value);
    if (currentIndex < values.length - 1) {
      return values[currentIndex + 1];
    } else {
      return null;
    }
  };

  const handleDrawCard = () => {
    const newHand = [...hand];
    const card = deck.pop();
    newHand.push(card);
    setHand(newHand);
    setDeck(deck);
  };

  return (
    <div className="stack-the-deck">
      <div className="stack">
        {stack.map((card, index) => (
          <Card key={index} value={card.value} suit={card.suit} />
        ))}
      </div>
      <div className="hand">
        {hand.map((card, index) => (
          <Card key={index} value={card.value} suit={card.suit} onClick={()=> handleCardClick(index)} />
    ))}
    {deck.length > 0 && (
      <button onClick={handleDrawCard}>Draw Card</button>
    )}
  </div>
  {gameOver && (
    <div className="game-over">
      <h2>Congratulations, you stacked the deck!</h2>
    </div>
  )}
</div>
);
};

export default StackTheDeck;
