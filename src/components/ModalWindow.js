import React from "react"
import "./ModalWindow.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import AccessibilityIcon from '@mui/icons-material/Accessibility';

const ModalWindow = (props) => {
  const { active, message } = props;
  function simpleFunc() {
    if (message === "Opponent turn") {
      return <Box sx={{ display: 'flex' }}><CircularProgress /></Box>
    }
    else if (message === "You lost the game!") {
      return <VideogameAssetOffIcon fontSize="large" className='icon'/>
    }
    else if (message === "You won the game!"){
      return <EmojiEventsIcon fontSize="large" className='icon'/>
    }
    else return  <AccessibilityIcon fontSize="large" className='icon'/>
  }
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content__msg" > {message  }</div>
        <div className="modal__content__func" >{simpleFunc()}</div>
    </div>
  )
}

export default ModalWindow