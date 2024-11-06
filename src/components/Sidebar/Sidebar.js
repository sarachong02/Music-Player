import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SidebarButton from './SidebarButton';

import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { MdSpaceDashboard } from 'react-icons/md';

import apiClient from "../../spotify";

import profileImg from "../../assets/profile.svg";

const Sidebar = () => {
  const [image, setImage] = useState(
    // profileImg
    "https://i.scdn.co/image/ab67757000003b82008e20bcf8a0e3f72dc2706f"
  );
  useEffect(() => {
    apiClient.get("me").then(response => {
      setImage(response.data.images[0].url);
    }); // "me" represents current login user
  },[])
  return (
    <div className='sidebar-container'>
        <img src={image} className='profile-img' alt='profile'/>

        <div>
            <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard/>}/>
            <SidebarButton title="Player" to="/player" icon={<FaPlay/>}/>
            <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite/>}/>
            <SidebarButton title="Library" to="/library" icon={<IoLibrary/>}/>
        </div>
        <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt/>}/>
    </div>

    
  )
}

export default Sidebar