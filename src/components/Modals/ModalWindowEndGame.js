import React, { useEffect, useState } from "react"
import "./ModalWindowEndGame.css"

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';

const ModalWindowEndGame = (props) => {
  const { activeEnd, messageEnd, onClick } = props;
  const [win, setWin] = useState(false)

  useEffect(() => {
    iconFunc();
  }, [win]); 


  function iconFunc() {
    if (messageEnd === "You lost the game!") {
      setWin(false)
    }
    else {
      setWin(true)
    }
  }

  return (
    <div>
      {win ?
        <div className={activeEnd && win ? "modal active" : "modal"} onClick={onClick}>
          <div
            className={"modal__content__msg win1"}
            onClick={onClick}> {messageEnd}</div>
          <div
            className={"modal__content__icon win2"}
            onClick={onClick}> <EmojiEventsIcon fontSize="large" className='icon' /> </div>
        </div>
        :
        <div className={activeEnd ? "modal active" : "modal"} onClick={onClick}>
          <div
            className={"modal__content__msg lost1"}
            onClick={onClick}> {messageEnd}</div>
          <div
            className={"modal__content__icon lost2"}
            onClick={onClick}> <VideogameAssetOffIcon fontSize="large" className='icon' /></div>
        </div>
      }
    </div>
  )
}

export default ModalWindowEndGame