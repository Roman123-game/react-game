import React, { useState, useEffect } from "react";
import "./Uniqe.css";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';
import GrassIcon from '@mui/icons-material/Grass';
import Badge from '@mui/material/Badge'
import ModalWindow from "./Modals/ModalWindow"
import ModalWindowEndGame from "./Modals/ModalWindowEndGame"

const CARD_TYPES = {
  fire: {
    name: <LocalFireDepartmentIcon fontSize="xx-large" />,
    damage: 5
  },
  water: {
    name: <WaterIcon fontSize="xx-large" />,
    damage: 4
  },
  earth: {
    name: <GrassIcon fontSize="xx-large" />,
    damage: 3
  },
  wind: {
    name: <AirIcon fontSize="xx-large" />,
    damage: 2
  }
};

function Uniqe() {
  const [playerHealth, setPlayerHealth] = useState(20);
  const [opponentHealth, setOpponentHealth] = useState(20);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [newGame, setNewGame] = useState("false");
  const [message, setMessage] = useState("");
  const [messageEnd, setMessageEnd] = useState("");
  const [active, setActive] = useState(false)
  const [activeEnd, setActiveEnd] = useState(false)
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
    setActive(true);
    setMessage("Opponent turn")
    setTimeout(() => {
      opponentTurn();
      setActive(false);
    }, "2000");
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
      setMessageEnd("You lost the game!");
      setActiveEnd(true);
      setNewGame("true")
      setPlayerHealth(20);
      setOpponentHealth(20);
    } else if (opponentHealth <= 0) {
      setMessageEnd("You won the game!");
      setActiveEnd(true);
      setNewGame("true")
      setPlayerHealth(20);
      setOpponentHealth(20);
    }
  }, [playerHealth, opponentHealth]);

  // Initialize the game by shuffling and drawing cards
  useEffect(() => {
    // Create the deck of cards
    const deck = [];
    for (const type in CARD_TYPES) {
      for (let i = 0; i < 14; i++) {
        deck.push({ type });
      }
    }
    const shuffledDeck = shuffleCards(deck);
    const playerDeck = shuffledDeck.slice(0, 20);
    const opponentDeck = shuffledDeck.slice(20, 40);
    // Draw 7 cards for the player and opponent
    const playerHand = [];
    const opponentHand = [];
    for (let i = 0; i < 7; i++) {
      drawCard(playerDeck, playerHand);
      drawCard(opponentDeck, opponentHand);
    }
    setPlayerHand(playerHand);
    setOpponentHand(opponentHand);
  }, [newGame]);

  const rules = `In Uniqe Game, players take turns playing cards from their hand to deal damage to each other. Each card has a type (fire, water, earth, or wind),
  and a corresponding damage value. The game ends when one player's health is reduced to 0.`

  return (
    <div className="main">
      <ModalWindow active={active} message={message} />
      <ModalWindowEndGame activeEnd={activeEnd} messageEnd={messageEnd} onClick={()=>setActiveEnd(false)} />
      <h1 className="header">Elemental Clash</h1>
      <h4 className="rules">{rules}</h4>
      <div className="health">
        <Badge badgeContent={playerHealth} color="secondary">  Player Health
        </Badge>
        <Badge badgeContent={opponentHealth} color="secondary"> Opponent Health
        </Badge>
      </div>
      <div className="hands">
        <div className="player-hand">
          <h2 className="hand">Your Hand:</h2>
          <div>
            {playerHand.map((card, index) => (
              <div
                key={index}
                className="card"
                onClick={() => playCard(index)}>
                {CARD_TYPES[card.type].name}
              </div>
            ))}
          </div>
        </div>
        <div className="opponent-hand">
          <h2 className="hand">Opponent's Hand:</h2>
          <div className="cardsRow">
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