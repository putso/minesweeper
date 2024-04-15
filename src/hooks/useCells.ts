import React, { useState } from "react";
import {
  immuTableTouchPoint,
  addMines,
  setNumbersCells,
  OpenEmpty,
  setPressed,
  markCell,
  isMineCell,
  isOpen,
  isMark,
  openMap,
} from "../tools";
import {
  EmoteStateType,
  gameStateType,
  CellType,
  onClickCellType,
} from "../types";
let array: CellType[][] = [];
for (let i = 0; i < 16; i++) {
  array.push([]);
  for (let j = 0; j < 16; j++) {
    array[i][j] = {
      displayed: "empty",
      value: "empty_pressed",
      pressed: false,
      onPressed: false,
    };
  }
}
const generateNewCells = ()=> {
  const array: CellType[][] = [];
  for (let i = 0; i < 16; i++) {
    array.push([]);
    for (let j = 0; j < 16; j++) {
      array[i][j] = {
        displayed: "empty",
        value: "empty_pressed",
        pressed: false,
        onPressed: false,
      };
    }
  }
  return array;
};
const initMines = 20
const useCells = () => {
  const [mines, setMines] = useState(initMines);
  const [emote, setEmote] = useState<EmoteStateType>('emote');
  const [gameState, setGameState] = useState<gameStateType>("pause");
  const [cells, setCells] = useState<CellType[][]>(array);
  const mouseClick: onClickCellType = (p) => {
    const { i, j } = p;
    //if(isMineCell(cells,p)) setMines(value => value-1);
    if (gameState === "pause") {
      setCells((ar) => {
        ar = immuTableTouchPoint(ar, p);
        let result = addMines(ar, p, mines);
        result = setNumbersCells(result);
        result = OpenEmpty(result, p);
        return [...result];
      });
      setGameState("play");
      return;
    }
    if (gameState === "play") {
      setCells((arr) => {
        arr = immuTableTouchPoint(arr, p);
        arr = OpenEmpty(arr, p);
        if(isMineCell(arr,p)) {
          setEmote('emote_lose');
          setCells(arr=> openMap(arr));
          setGameState('over');
        }
        return [...arr];
      });
    }
  };
  const mouseDown: onClickCellType = (p) => {
    if(gameState == 'over') return;
    console.log('123')
    const { i, j } = p;
    setCells((arr) => {
      arr =setPressed(arr, p, true);
      return [...arr];
    });
    setEmote('emote_fear')
  };
  const mouseUp: onClickCellType = (p) => {
    const { i, j } = p;
    setCells((arr) => {
      arr = setPressed(arr, p, false);
      return [...arr];
    });
    setEmote('emote')
  };
  const mouseRightClick: onClickCellType = (p) => {
    setCells((arr) => {
      if(isOpen(arr,p)) return arr;
      arr = immuTableTouchPoint(arr, p);
      if(!isMark(arr,p)) setMines(value => value>0 ? value-1 : value);
      else setMines(value => value+1);
      arr = markCell(arr, p);
      
      return arr;
    });
  };
  const resetGame = () => {
    setGameState(staste => 'pause');
    setCells(arr => generateNewCells());
    setMines(value => initMines);
  };
  return {
    emote,
    cells,
    mines,
    gameState,
    resetGame,
    mouseHandlers: {
      resetGame,
      mouseDown,
      mouseUp,
      mouseClick,
      mouseRightClick,
      
    },
  };
};
export default useCells;
