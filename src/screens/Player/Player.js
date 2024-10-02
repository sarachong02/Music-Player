import React, { useEffect, useState } from 'react';
import "./Player.css";
import { useLocation } from 'react-router-dom';
import apiClient from '../../spotify';

import SongCard from '../../components/SongCard/SongCard';
import Queue from '../../components/Queue/Queue';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

const Player = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (location.state){
      apiClient.get("playlists/"+ location.state?.id + "/tracks")
      .then((res) => {
        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0].track); 
      });
    }
  }, [location.state]); // whenever location changes, it will create a different playlist id

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className='screen-container flex'>
      <div className='left-player-body'>
        <AudioPlayer 
          currentTrack={currentTrack}
          isPlaying = {true}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}/>
      </div>

      <div className='right-player-body'>
        <SongCard album={currentTrack?.album}/>
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex}/>
      </div>
    </div>
  )
}

export default Player