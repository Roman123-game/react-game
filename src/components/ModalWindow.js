import React from "react"
import "./ModalWindow.css"


const ModalWindow =(props)=>{
 const  {active, setActive, message} = props
  return (
    <div className={active? "modal active": "modal" }onClick={()=>setActive(false)}>
    <div className="modal__content" onClick={(e)=>e.stopPropagination()}>
     {message}
</div>

    </div>
  )
}

export default ModalWindow