import React, { useState, useEffect } from "react";
import "./Uniqe.css";

// Define card types and their attributes
const CARD_TYPES = {
  FIRE: { name: "Fire", damage: 3 },
  WATER: { name: "Water", damage: 2 },
  EARTH: { name: "Earth", damage: 1 },
  WIND: { name: "Wind", damage: 0 },
};

function Uniqe() {
  // State for the player's and opponent's decks
  const [playerDeck, setPlayerDeck] = useState([]);
  const [opponentDeck, setOpponentDeck] = useState([]);

  // State for the player's and opponent's hands
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);

  // State for the player's and opponent's health
  const [playerHealth, setPlayerHealth] = useState(20);
  const [opponentHealth, setOpponentHealth] = useState(20);

  // Shuffle an array of cards
  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  // Draw a card from a deck and add it to a hand
  const drawCard = (deck, hand) => {
    if (deck.length > 0) {
      const card = deck.pop();
      hand.push(card);
      return true;
    } else {
      return false;
    }
  };

  // Play a card from the player's hand
  const playCard = (cardIndex) => {
    const card = playerHand[cardIndex];
    const newPlayerHand = [...playerHand];
    newPlayerHand.splice(cardIndex, 1)


    // Deal damage to the opponent based on the card type
    const damage = CARD_TYPES[card.type].damage;
    setOpponentHealth(opponentHealth - damage);
  }
  // Check if the game is over (either player's health is 0)
  useEffect(() => {
    if (playerHealth <= 0) {
      alert("You lost the game!");
    } else if (opponentHealth <= 0) {
      alert("You won the game!");
    }
  }, [playerHealth, opponentHealth]);

  // Initialize the game by shuffling and drawing cards
  useEffect(() => {
    // Create the deck of cards
    const deck = [];
    for (const type in CARD_TYPES) {
      for (let i = 0; i < 10; i++) {
        deck.push({ type });
      }
    }
    // Shuffle the deck and split it between the player and opponent
    const shuffledDeck = shuffleCards(deck);
    const playerDeck = shuffledDeck.slice(0, 20);
    const opponentDeck = shuffledDeck.slice(20, 40);
    setPlayerDeck(playerDeck);
    setOpponentDeck(opponentDeck);

    // Draw 3 cards for the player and 2 cards for the opponent
    const newPlayerHand = [];
    const newOpponentHand = [];
    for (let i = 0; i < 3; i++) {
      drawCard(playerDeck, newPlayerHand);
    }
    for (let i = 0; i < 2; i++) {
      drawCard(opponentDeck, newOpponentHand);
    }
    setPlayerHand(newPlayerHand);
    setOpponentHand(newOpponentHand);
  }, []);

  return (
    <div className="main">
      <h1>Elemental Clash</h1>
      <h5>Rules: In "Elemental Clash", players take turns playing cards from their hand to deal damage to each other. 
        Each card has a type (fire, water, earth, or wind) and a corresponding damage value. The game ends when one player's health is reduced to 0.</h5>
      <div className="player">
        <h2>Player</h2>
        <p>Health: {playerHealth}</p>
        <div className="hand">
          {playerHand.map((card, index) => (
            <div
              key={index}
              className="card"
              onClick={() => playCard(index)}
            >
              {CARD_TYPES[card.type].name}
            </div>
          ))}
        </div>
      </div>
      <div className="opponent">
        <h2>Opponent</h2>
        <p>Health: {opponentHealth}</p>
        <div className="hand">
          {opponentHand.map((card, index) => (
            <div key={index} className="card">
              {CARD_TYPES[card.type].name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Uniqe