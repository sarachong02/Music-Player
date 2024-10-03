import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";
import Controls from "../AudioPlayer/Controls";
import ProgressCircle from "../AudioPlayer/ProgressCircle"
import WaveAnimation from "../AudioPlayer/WaveAnimation"

export default function AudioPLayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // State for mute
  var audioSrc = total[currentIndex]?.track.preview_url;

  const audioRef = useRef(new Audio(total[0]?.track.preview_url));

  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.play().then(() => {
            if (isMuted) {
                setIsMuted(false); // Unmute on successful play
              }
            });
            startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        // audioRef.current.play();
        // startTimer();
    } else {
      if (isPlaying) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play().then(() => {
            if (isMuted) {
              setIsMuted(false); // Unmute on successful play
            }
          });
          startTimer();
        } else {
          clearInterval(intervalRef.current);
          audioRef.current.pause();
        }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

//  useEffect(() => {
//     // Create a new Audio instance only when the user clicks play for the first time
//     if (isReady.current) {
//       audioRef.current.pause(); // Pause the current audio before changing the track
//       audioRef.current.src = audioSrc; // Update the source
//       setTrackProgress(0); // Reset track progress
//       audioRef.current.play().catch((error) => {
//         console.error("Playback failed:", error); // Catch any errors
//       });
//       setIsPlaying(true); // Ensure it is set to playing
//       startTimer(); // Start the timer
//     } else {
//       isReady.current = true; // Mark that the audio has been initialized
//     }
//   }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };
  const artists = [];
  currentTrack?.album?.artists.forEach((artist) => {
    artists.push(artist.name);
  });

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause(); // Pause the audio
    } else {
      setIsPlaying(true);
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error); // Catch any errors
      });
      audioRef.current.muted = false; // Unmute when the play button is pressed
    }
  };
  

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#A0FA9E"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            handlePlay = {handlePlay}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}