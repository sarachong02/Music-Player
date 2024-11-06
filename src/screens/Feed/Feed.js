import React, { useEffect, useState } from 'react';
import "./Feed.css";
import { useLocation } from 'react-router-dom';
import apiClient from '../../spotify'; 
// import Widgets from '../../components/Widgets/Widgets';
import PlaylistContainer from '../../components/PlaylistContainer/PlaylistContainer';

const Feed = () => {
  return (
    <div className='screen-container flex'>
      <div className='left-feed-body '>
        <div className='new-releases-body'>
          <PlaylistContainer type="newReleases"/>
        </div>

        <div className='featured-playlist-body'>
          <PlaylistContainer type="featuredPlaylists"/>
        </div>

      </div>

      <div className='right-feed-body flex'>
        <PlaylistContainer type="recommendations"/>
      </div>
    </div>
  )
}

export default Feed