import React from "react"
import "./ModalWindow.css"


const ModalWindow =(props)=>{
 const  {active, setActive, message} = props
  return (
    <div className={active? "modal active": "modal" }>
    <div className="modal__content" >
     {message}
</div>

    </div>
  )
}

export default ModalWindow