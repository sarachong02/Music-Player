import React, { useEffect, useState } from 'react';
import "./Player.css";
import { useLocation } from 'react-router-dom';
import apiClient from '../../spotify'; 

import SongCard from '../../components/SongCard/SongCard';
import Queue from '../../components/Queue/Queue';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import Widgets from '../../components/Widgets/Widgets';

const Player = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Check if location.state has 'favorites' array or a 'playlist' ID
    if (location.state?.tracks) {

      apiClient.get('me/top/tracks')
        .then((res) => {
          // console.log("Res.tracks",res.data.items)
          setTracks(res.data.items)
          setCurrentTrack(res.data.items[0])
        })
    } else if (location.state?.id) {
      // If it's from a Playlist, fetch playlist tracks
      apiClient.get("playlists/" + location.state.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data.items[0].track); 
        })
        .catch((error) => console.error("Error fetching playlist tracks:", error));
    }
  }, [location.state]); 

  useEffect(() => {
    console.log('Updated tracks:', tracks);
  }, [currentTrack]);

  useEffect(() => {
    const newCurrentTrack = tracks[currentIndex]?.track || tracks[currentIndex];
    setCurrentTrack(newCurrentTrack);
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
          

        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>

      <div className='right-player-body'>
        <SongCard album={currentTrack?.album}/>
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex}/>
      </div>
    </div>
  )
}

export default Player