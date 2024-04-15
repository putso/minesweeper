import React, { useEffect, useState } from "react";
import { CellStateType, CellType, mouseHandlersType, onClickCellType } from "../types";
import Cell from "./Cell";
let array: number[][] = [];
for (let i = 0; i < 16; i++) {
  array.push([]);
  for (let j = 0; j < 16; j++) {
    array[i][j] = 0;
  }
}
const Cells: React.FC<{
  cells: CellType[][];
  mouseHandler: mouseHandlersType
}> = ({ cells,mouseHandler }) => {
  const [pressed,setPressed] = useState(false);
  useEffect( () => {
    const mD = () => setPressed(true);
    const mU = () => setPressed(false);
    document.addEventListener('mousedown', mD);
    document.addEventListener('mouseup', mU);
    return () => {
      document.removeEventListener('mousedown',mD);
      document.removeEventListener('mouseup',mU);
    }
  },[pressed])
  return (
    <div>
      {cells.map((el, i) => {
        return (
          <div key={i} className="flex">
            {el.map((state, j) => {
              return (
                <Cell
                mouseHandler= {mouseHandler}
                  key={j}
                  cords={{ i,j
                  }}
                  state={state}
                  pressed = {pressed}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Cells;
