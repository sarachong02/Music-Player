import React from 'react'
import Home from './screens/Home/Home'

const App = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default App

// src/App.js
// import React, { useEffect, useState } from 'react';
// import Home from './screens/Home/Home';
// import Login from './screens/auth/Login';
// import { setClientToken } from './spotify';

// const App = () => {
//   const [token, setToken] = useState("");

//   useEffect(() => {
//     // Check if a token is already in localStorage
//     const storedToken = localStorage.getItem("spotifyToken");

//     if (storedToken) {
//       console.log("Token found in localStorage:", storedToken);
//       setToken(storedToken);
//       setClientToken(storedToken);
//     } else {
//       // If no token in localStorage, look for it in URL hash
//       const hash = window.location.hash;
//       if (hash) {
//         const tokenString = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"));
        
//         if (tokenString) {
//           const newToken = tokenString.split("=")[1];
//           console.log("Token found in URL:", newToken);

//           // Set token in state, localStorage, and header
//           setToken(newToken);
//           localStorage.setItem("spotifyToken", newToken);
//           setClientToken(newToken);

//           // Clear URL hash after extracting token
//           window.location.hash = "";
//         }
//       } else {
//         console.log("No token found in URL or localStorage, redirecting to login.");
//       }
//     }
//   }, []);

//   return (
//     <div>
//       {token ? <Home /> : <Login />}
//     </div>
//   );
// };

// export default App;