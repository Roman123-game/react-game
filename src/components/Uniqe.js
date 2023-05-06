import React, { useState, useEffect } from "react";
import "./Uniqe.css";

const CARD_TYPES = {
  fire: {
    name: "\uD83D\uDD25",
    damage: 5
  },
  water: {
    name: "\uD83D\uDCA7",
    damage:4
  },
  earth: {
    name: "\uD83C\uDF0D",
    damage: 3
  },
  wind: {
    name: "\uD83C\uDF43",
    damage: 2
  }
};

function Uniqe() {
  const [playerHealth, setPlayerHealth] = useState(20);
  const [opponentHealth, setOpponentHealth] = useState(20);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);

  // Shuffle an array of cards
  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  // Draw a card from the deck and add it to the hand
  const drawCard = (deck, hand) => {
    if (deck.length > 0) {
      const card = deck[0];
      deck.splice(0, 1);
      hand.push(card);
    }
  };

  // Play a card from the player's hand
  const playCard = (index) => {
    // Remove the card from the player's hand
    const newPlayerHand = [...playerHand];
    const card = newPlayerHand.splice(index, 1)[0];
    setPlayerHand(newPlayerHand);

    // Deal damage to the opponent based on the card type
    const damage = CARD_TYPES[card.type].damage;
    setOpponentHealth(opponentHealth - damage);

    // Opponent takes turn
    opponentTurn();
  };

  // Opponent plays a random card from their hand
  const opponentTurn = () => {
    const index = Math.floor(Math.random() * opponentHand.length);
    const card = opponentHand[index];
    const newOpponentHand = [...opponentHand];
    newOpponentHand.splice(index, 1);
    setOpponentHand(newOpponentHand);

    // Deal damage to the player based on the card type
    const damage = CARD_TYPES[card.type].damage;
    setPlayerHealth(playerHealth - damage);
  };

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
      for (let i = 0; i < 12; i++) {
        deck.push({ type });
      }
    }

    const shuffledDeck = shuffleCards(deck);
    const playerDeck = shuffledDeck.slice(0, 20);
    const opponentDeck = shuffledDeck.slice(20, 40);
    setPlayerDeck(playerDeck);
    setOpponentDeck(opponentDeck);

    // Draw 5 cards for the player and opponent
    const playerHand = [];
    const opponentHand = [];
    for (let i = 0; i < 6; i++) {
      drawCard(playerDeck, playerHand);
      drawCard(opponentDeck, opponentHand);
    }
    setPlayerHand(playerHand);
    setOpponentHand(opponentHand);
  }, []);

  return (
    <div className="main">
      <h2>Elemantal Clash</h2>
      <h5>In "Elemental Clash", players take turns playing cards from their hand to deal damage to each other. Each card has a type (fire, water, earth, or wind)
         and a corresponding damage value. The game ends when one player's health is reduced to 0.</h5>
      <div className="health">
        <div>Player Health: {playerHealth}</div>
        <div>Opponent Health: {opponentHealth}</div>
      </div>
      <div className="hands">
        <div className="player-hand">
          <h2 className="hand">Your Hand:</h2>
          <div>
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
        <div className="opponent-hand">
          <h2 className="hand">Opponent's Hand:</h2>
          <div>
            {opponentHand.map((card, index) => (
              <div key={index} className="card">
                {CARD_TYPES[card.type].name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Uniqe