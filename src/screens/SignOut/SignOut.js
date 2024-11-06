import React from 'react';
import { loginEndpoint } from '../../spotify';
import './SignOut.css';

const SignOut = () => {
  // Sign out function
  const handleSignOut = () => {
    // Remove the token from localStorage
    window.localStorage.removeItem("token");

    // Redirect to Spotify's logout URL
    window.location.href = 'https://accounts.spotify.com/en/logout'; // Spotify logout URL
  };

  return (
    <div className="signout-page">
        <h1>Sign Out of Account?</h1>
        <h4>If you would like to return to the Music Player, please copy this link:</h4>
        <p>https://sarachong02.github.io/Music-Player</p>
      <button onClick={handleSignOut} className="signout-btn">
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
