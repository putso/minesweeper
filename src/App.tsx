import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MinesTable from './components/MinesTable';
import EmoteTable from './components/EmoteTable';
import TimeTable from './components/TimeTable';
import Cells from './components/Сells';
import { CellState, EmoteState, EmoteStateType,CellStateType, gameStateType, CellType, onClickCellType } from './types';
import { addMines, immuTableTouchPoint, isMineCell, markCell, OpenEmpty, setNumbersCells, setPressed } from './tools';
import useCells from './hooks/useCells';
interface MouseHanlder {
  mouseUp:onClickCellType,
  mouseDown: onClickCellType,
  mouseClick: onClickCellType,
  RightClick: onClickCellType
}
let array:CellType[][] = [];
for(let i = 0;i<16;i++) {
    array.push([]);
    for(let j = 0 ; j<16;j++) {
       array[i][j] = {
        displayed: 'empty',
        value: 'empty_pressed',
        pressed: false,
        onPressed:false
       }; 
    }
}

function App() {
  const {mines,gameState, cells, mouseHandlers,emote,resetGame} = useCells();
  const EmoteClickHandler = () => {
    resetGame();
  }
  return (
    <div className='border border-black'>
      <header className=' h-16 bg-[#c0c0c0] w-[320px] header p-2 '>
        <div className='wrapper justify-between flex h-full bg-[#c0c0c0] w-full '>
        <MinesTable countMines={mines}></MinesTable>
        <EmoteTable clickHandler = {EmoteClickHandler} emote = {emote}></EmoteTable>
        <TimeTable gameState = {gameState}></TimeTable>
        </div>
      </header>
      <Cells mouseHandler = {mouseHandlers} cells = {cells}></Cells>
      
    </div>
  );
}

export default App;
let t = {
  'Важное': 'red',
}
console.log(t['Важное'])