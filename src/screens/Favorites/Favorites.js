// import React, {useState, useEffect}from 'react';
// // import apiClient from '../../spotify';
// import APIKit from "../../spotify"
// import { IconContext } from 'react-icons';
// // import { AiFillPlayCircle } from 'react-icons/ai';
// import { FaHeart } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import './Favorites.css';


// const Favorites = () => {
//   const [favorites, setFavorites] = useState(null);

//   useEffect(() => {
//     APIKit.get('me/top/tracks').then(function(response) {
//       setFavorites(response.data.items);
//       console.log("Response from API:", response.data);
//     });
//   }, []);

//   const navigate = useNavigate();

//   // const playFavorite = () => {
//   //   navigate("/player", { state: { favorites: favorites } });
//   // };

//   const playFavorite = () => {
//     console.log("Favorites being passed:", favorites); // Debugging line
//     navigate("/player", { state: { favorites: favorites } });
//   };

//   return (
//     <div className='screen-container'>
//       {/* <h1 className='favorites-header'>Your Top Tracks</h1> */}
//       <div className='favorites-body'>
//         {favorites?.map((favorite) => (
//           <div className='favorites-card' key={favorite.id} onClick={() => playFavorite(favorite.id)}>
//           <img src={favorite?.album?.images?.[0]?.url} className='favorites-image' alt="Favorite-Image" />
//           <p className='favorites-title'>{favorite.name}</p>
//           <p className='favorites-subtitle'>{favorite?.artists?.[0]?.name}</p>
//           <div className='favorites-fade'>
//             <IconContext.Provider value={{ size: "35px", color: "#A0FA9E"}}>
//               <FaHeart />
//             </IconContext.Provider>

//           </div>

//         </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default Favorites

import React, { useState, useEffect } from 'react';
import APIKit from "../../spotify";
import { IconContext } from 'react-icons';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    APIKit.get('me/top/tracks').then(function(response) {
      setFavorites(response.data.items);
      console.log("Response from API:", response.data);
    });
  }, []);

  // const navigate = useNavigate();
  // const playFavorite = (favorite) => {
  //   console.log("Favorites being passed:", favorites); // Debugging line
  //   navigate("/player", { state: { tracks: favorites} }); // Pass both the list and the specific track
  //   console.log("currentTrack",favorite)
  // };

  return (
    <div className='screen-container'>
      <div className='favorites-body'>
        {favorites?.map((favorite) => (
          <div className='favorites-card'>
            <img src={favorite?.album?.images?.[0]?.url} className='favorites-image' alt="Favorite-Image" />
            <p className='favorites-title'>{favorite.name}</p>
            <p className='favorites-subtitle'>{favorite?.artists?.[0]?.name}</p>
            <div className='favorites-fade'>
              <IconContext.Provider value={{ size: "35px", color: "#A0FA9E"}}>
                <FaHeart />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
