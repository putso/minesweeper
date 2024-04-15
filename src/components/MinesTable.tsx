import React, { Ref } from 'react'
import { getNumber } from '../tools';

const MinesTable:React.FC<{
  countMines: number 
}> = ({countMines}) => {
  let numbers = getNumber(countMines);
  return (
    <div className='flex '>
      {
        numbers.map((number,i) => {
          return <img key = {i} className = 'z-10' src={`n${number}.png`} alt={'number'} />
        })
      }
    </div>
  )
}

export default MinesTable
