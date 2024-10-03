import React from 'react';
import "./Controls.css";
import { IconContext } from 'react-icons';
import { FaPause } from 'react-icons/fa';
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay, IoShuffleOutline, IoRepeat } from 'react-icons/io5';

const Controls = ({isPlaying, handlePlay, handleNext, handlePrev}) => {
  return <IconContext.Provider value={{size: "35px", color: "#9bf59a"}}>
    <div className='controls-wrapper flex'>
      <div className='action-btn flex' onClick={handlePrev}>
        <IoPlaySkipBack />
      </div>
      <div className={isPlaying ? 'play-pause-btn flex active' : "play-pause-btn flex"} onClick={handlePlay}>
        {isPlaying ? <FaPause /> : <IoPlay /> }
      </div>
      <div className='action-btn flex' onClick={handleNext}>
        <IoPlaySkipForward />
      </div>
    </div>
  </IconContext.Provider>
}

export default Controls