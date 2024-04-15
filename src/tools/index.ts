import { platform } from "os";
import {
  ArrCellType,
  CellStateType,
  CellType,
  gameStateType,
  NumbersState,
  Point,
  TouchCellFuntion,
} from "../types";





export const getNumber = (number: number) => {
  let temp = number.toString().split("");
  let result = [0, 0, 0];
  let re = result.length - temp.length;
  for (let i = re; i < 3; i++) {
    result[i] = Number(temp[i - re]);
  }
  return result;
};
let mines = 10;
const generateArrCords = (h: number, w: number): { i: number; j: number }[] => {
  const result = [];
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      result.push({
        i,
        j,
      });
    }
  }
  return result;
};
const getRandomIntreval = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};
const randomSort = (arr: any[]) => {
  for (let i = 0; i < arr.length; i++) {
    let ri = getRandomIntreval(0, arr.length);
    [arr[i], arr[ri]] = [arr[ri], arr[i]];
  }
  return arr;
};
const getRandomCords = (count: number, arr: any[][]) => {
  let randomArr = generateArrCords(arr.length, arr[0].length);
  randomArr = randomSort(randomArr);
  return randomArr;
};

export const comparePoints = (p1: Point, p2: Point) =>
  p1.i == p2.i && p1.j == p2.j;
export const addMines = (arr: CellType[][], p: Point, count: number) => {
  let RCords = getRandomCords(count, arr);
  for (let t = 0; t < count; t++) {
    let p2 = RCords[t],
      { i, j } = p2;
    if (comparePoints(p, p2)) {
      count++;
      continue;
    }
    arr[i][j].value = "mine_over";
  }
  return arr;
};
export const getPath = (b: boolean = false) => {
  let path = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i == 0 && j == 0) continue;
      if (b && i == j) continue;
      path.push({ i, j });
    }
  }
  return path;
};
const sumPoints = (p1: Point, p2: Point) => ({
  i: p1.i + p2.i,
  j: p1.j + p2.j,
});
const PointInCurrentArr = (arr: any[][]) => {
  return (p: Point) => inDoubleArr(arr, p);
};
export const isMineCell = (arr: ArrCellType, p: Point) => {
  let { i, j } = p;
  return arr[i][j].value == "mine_pressed" || arr[i][j].value == "mine_over"  ;
};
const inCurrentArr = (arr: any[][], f: (arr: any[][], p: Point) => any) => {
  return (p: Point) => f(arr, p);
};
const countMines = (arr: ArrCellType, p: Point) => {
  const path = getPath();
  const checkInArr = PointInCurrentArr(arr);
  const isMine = inCurrentArr(arr, isMineCell);
  const value = path
    .map((dir) => sumPoints(dir, p))
    .filter((p) => checkInArr(p) && isMine(p)).length;
  return value;
};
const getStateNumber = (n: number): CellStateType =>
  n ? NumbersState[n] : "empty_pressed";
export const inDoubleArr = (arr: any[][], p: Point) =>
  p.i >= 0 && p.i < arr.length && p.j >= 0 && p.j < arr[0].length;
export const setNumbersCells = (arr: ArrCellType) => {
  const isMine = inCurrentArr(arr, isMineCell);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      let p = { i, j };
      if (isMine(p)) continue;
      const value = countMines(arr, p);
      arr[i][j].value = getStateNumber(value);
    }
  }
  return arr;
};
const getNewPoints = (arr: ArrCellType, p: Point) => {
  return getPath(true)
    .map((dir) => sumPoints(dir, p))
    .filter((p) => inDoubleArr(arr, p));
};
// export const CellHandlerClick = (
//   arr: ArrCellType,
//   p: Point,
//   gameState: gameStateType
// ) => {
//     arr = addMines(arr,p,10);
//     arr == setNumbersCells(arr);
// };
const openCell = (arr: ArrCellType, p: Point) => {
  const { i, j } = p;
  arr[i][j].displayed = arr[i][j].value;
  arr[i][j].pressed = true;
  return arr;
};
export const isOpen = (arr: ArrCellType, p: Point) => {
    const { i, j } = p;
    return arr[i][j].pressed;
}
const isEmptyCell =  (arr: ArrCellType, p: Point) => {
    const { i, j } = p;
    const value = arr[i][j].value;
    return value == 'empty' || value == "empty_pressed";
}
export const OpenEmpty = (arr: ArrCellType, p: Point) => {
  if(isOpen(arr,p) || isMark(arr,p) ) return arr;  
  arr = openCell(arr, p);
  if (isMineCell(arr, p)) return arr;
  if(isEmptyCell(arr,p)) {
    const points = getNewPoints(arr, p);
    points.forEach((p) => {
      arr = OpenEmpty(arr, p);
    });
  }
  return arr;
};
export const immuTableTouchPoint:TouchCellFuntion<ArrCellType> = (arr,p) => {
  const { i, j } = p;
  arr = [...arr];
  arr[i] = [...arr[i]]
  arr[i][j] = {...arr[i][j]};
  return arr;
}
export const markCell:TouchCellFuntion<ArrCellType> = (arr,p) => {
  if(isOpen(arr,p)) return arr;
  const { i, j } = p;
  arr[i] = [...arr[i]]
  arr[i][j] = {...arr[i][j]};
  console.log(arr[i][j],p)
  if(isMark(arr,p)) arr[i][j].displayed = 'empty';
  else  arr[i][j].displayed = 'flag'
  return arr;
}
export const openMap = (arr:ArrCellType):ArrCellType => {
  for(let i = 0; i<arr.length;i++) {
    for(let j = 0; j<arr[0].length;j++) {
      const p = {i,j};
      if(!isMineCell(arr,p)) continue;
      if(isMark(arr,p)) arr[i][j].displayed = 'mine_detected';
      else arr[i][j].displayed = 'mine_pressed';
      
    }
  }
  return arr;
}
export const isMark:TouchCellFuntion<boolean> = (arr,p) => {
  const { i, j } = p;
  return arr[i][j].displayed == 'flag';
}

export const setPressed = (arr:ArrCellType,p:Point,value:boolean) => {
  const { i, j } = p;
  arr[i][j].onPressed = value;
  return arr;
}