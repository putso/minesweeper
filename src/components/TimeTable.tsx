import React, { useEffect, useRef, useState } from 'react'
import { StringDecoder } from 'string_decoder';
import { gameStateType } from '../types';
const getNumber = (number:number) => { 
  let temp = number.toString().split('');
  let result = [0,0,0];
  let re = result.length - temp.length;
  for(let i = re;i<3;i++) {
    result[i]=(Number(temp[i-re]));
  }
  return result;
}
const TimeTable: React.FC<{
  gameState: gameStateType,
}> = ({gameState}) => {
  const now = useRef(Date.now());
  const [time,setTime] = useState(0);
  useEffect( () => {
    let interval:NodeJS.Timer;
    // console.log('useEffect')
    if(gameState == 'play') {
      now.current = Date.now();
     interval = setInterval( () => {
      console.log('interval')
        setTime(new Date(Date.now() - now.current).getSeconds());
      },1000);
    } else if( gameState == 'pause') {
      setTime(0)
    }
    return () => {
      clearInterval(interval);
    } 
  },[gameState]);

  const numbers = getNumber(time)
  // console.log(time,numbers)
  return (
    <div className='flex'>
    {
      numbers.map((number,i) => {
        return <img className = {`z-10 w-[26px] ${i}`} key = {i} src={`n${number}.png`} alt={''} />
      })
    }
  </div>
  )
}

export default TimeTable
