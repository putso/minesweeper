import React, { useEffect, useState } from 'react'
import { EmoteStateType } from '../types'

const EmoteTable:React.FC<{
  emote: EmoteStateType,
  clickHandler: () => void
}> = ({emote,clickHandler}) => {
  const [onPressed,setOnPressed] = useState(false);

  const mouseDownHandler = () => {
    setOnPressed(true)
  };
  useEffect( () => {
    const mouseUpHandler = () => {
      setOnPressed(false);
    }
    if(onPressed) {
      document.addEventListener('mouseup', mouseUpHandler )
    }
    return () => {
      document.removeEventListener('mouseup',mouseUpHandler);
    }
  },[onPressed]);
  const getImage = ():EmoteStateType => {
    return onPressed ? 'emote_pressed' : emote;
  }
  return (
    <div onMouseDown={ mouseDownHandler} className='z-9 flex justify-center items-center' onClick={clickHandler}>
      <img className = 'z-10 h-[35px] relative' src={`${getImage()}.png`} alt="123" />
    </div>
  )
}

export default EmoteTable
