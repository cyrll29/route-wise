import React from 'react'
import '../../assets/global.css'

const buttonGroup = () => {
  return (
    <div className='buttonGroup'>
        <ul>
            <li><button>CLICK ME!</button></li>
            <li><button className='secondButton'>CLICK ME!</button></li>
            <li><button>CLICK ME!</button></li>
        </ul>
    </div>
  )
}

export default buttonGroup