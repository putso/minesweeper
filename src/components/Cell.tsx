import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react'
import { comparePoints } from '../tools'
import { CellState, CellStateType, CellType, mouseHandlersType, onClickCellType } from '../types'

const Cell: React.FC<{
  state: CellType,
  mouseHandler: mouseHandlersType
  cords: {
    i:number,
    j:number
  },
  pressed: boolean;
}> = ({state,cords,mouseHandler,pressed}) => {
  const value = state.pressed ? state.value : state.displayed;
  const onPressed = state.onPressed;
  const {
    resetGame,
    mouseDown,
    mouseUp,
    mouseClick,
    mouseRightClick,
  } = mouseHandler;
  const onRightClick:MouseEventHandler<HTMLImageElement> = (e) => {
    e.preventDefault();
    mouseRightClick(cords);
  }
  const onMouseDownHandler:MouseEventHandler = (e) => {
      if(e.button!==0) return;
      if(state.displayed == 'empty') mouseDown(cords);
  };
  const onClickHandler = () => {
    mouseClick(cords)
  }
  useEffect( () => {
    const upHandler = () => {
      mouseClick(cords);
      mouseUp(cords)
    }
    if(onPressed) {

      document.addEventListener('mouseup',upHandler) ;
    }
    return () => document.removeEventListener('mouseup',upHandler)

  },[onPressed])
  const getDisplayImgSrc = () => {
    if(onPressed && state.displayed=='empty') return 'empty_pressed'
    if(onPressed && state.displayed=='mark_pressed') return 'empty_pressed'
    return value

  }
  const mosueLeaveHandler = () => {
    if(pressed) mouseUp(cords)
  }
  const mouseOverHandler = () => {
    if(pressed) mouseDown(cords);
  }
  return (
    <div className='w-5 h-5 select-none'>
     <img draggable="false" onMouseOver={mouseOverHandler} onMouseLeave={mosueLeaveHandler} onMouseDown={onMouseDownHandler}  onContextMenu={onRightClick}  src={`cell_${getDisplayImgSrc()}.png`} className="w-full h-full select-none" alt="" />
    </div>
  )
}

export default Cell
