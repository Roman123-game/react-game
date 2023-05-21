import React from "react"
import "./ModalWindow.css"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const ModalWindow = (props) => {
  const { active, message} = props;
  function iconFunc() {
    if (message === "Opponent turn") {
      return <Box sx={{ display: 'flex' }}><CircularProgress /></Box>
    }
  
    
  }
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal__content__msg" > {message  }</div>
        <div className="modal__content__icon" >{iconFunc()}</div>
    </div>
  )
}

export default ModalWindow