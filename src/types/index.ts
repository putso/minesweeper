// export type CellsState  = 'hide' | 'mines' | 'flag' | 'mark' | CelNumber ;
// export type CellCanPresedState = 'hide' | 'mark'; 
// //type CellNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// export type Pressed = boolean


export enum CellState {
    empty = "empty",
    empty_pressed = "empty_pressed",
    flag = "flag",
    mark = "mark",
    mark_pressed = "mark_pressed",
    mine_pressed = "mine_pressed",
    mine_over = "mine_over",
    mine_detected = "mine_detected",


};
export type gameStateType = 'pause' | 'play' | 'over';
export const NumbersState = ['n0' ,'n1', 'n2', 'n3', 'n4', 'n5', 'n7', 'n8'] as const;
export enum EmoteState {
    emote = 'emote',
    emote_pressed = 'emote_pressed',
    emote_win = 'emote_win',
    emote_lose = 'emote_lose',
    emote_fear = 'emote_fear',
}
export type EmoteStateType = `${EmoteState}`;
export type CellStateType = `${CellState}` | typeof NumbersState[number];
export type CellType = {
    displayed:CellStateType ,
    value:CellStateType ,
    pressed: boolean,
    onPressed:boolean
}


export type onClickCellType = (cords: Point) => void
export type Point = {
    i:number,
    j:number
}
export type ArrCellType = CellType[][];
export type TouchCellFuntion<T = void> = (arr:ArrCellType,p:Point) => T  ;


export type mouseHandlersType = {
    resetGame: () => void;
    mouseDown: onClickCellType;
    mouseUp: onClickCellType;
    mouseClick: onClickCellType;
    mouseRightClick: onClickCellType;
}