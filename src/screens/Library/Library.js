import React, {useState, useEffect } from 'react';
import APIKit from "../../spotify";
import "./Library.css"
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    APIKit.get('me/playlists').then(function(response) {
      setPlaylists(response.data.items);
      console.log(response.data.items);
    });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/player", {state: {id: id}}); 
  }
  return (
    <div className='screen-container'>
      <div className='library-body'>
        {playlists?.map((playlist) => (
          <div className='playlist-card' key={playlist.id} onClick={() => playPlaylist(playlist.id)}>
            <img src={playlist.images[0].url} className='playlist-image' alt="Playlist-Image" />
            <p className='playlist-title'>{playlist.name}</p>
            <p className='playlist-subtitle'>{playlist.tracks.total} Songs</p>
            <div className='playlist-fade'>
              <IconContext.Provider value={{ size: "50px", color: "#A0FA9E"}}>
                <AiFillPlayCircle />
              </IconContext.Provider>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Library