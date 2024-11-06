import React, { useState, useRef, useEffect } from "react";
import "./AudioPlayer.css";
import Controls from "../AudioPlayer/Controls";
import ProgressCircle from "../AudioPlayer/ProgressCircle";
import WaveAnimation from "../AudioPlayer/WaveAnimation";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(true); // Start playing
  const [trackProgress, setTrackProgress] = useState(0);
  const audioRef = useRef(new Audio());
  const intervalRef = useRef();

  const audioSrc = total[currentIndex]?.track.preview_url;

  useEffect(() => {
    // Set the audio source when the currentIndex changes
    audioRef.current.src = audioSrc;
    setTrackProgress(0); // Reset progress when the track changes

    // Automatically play the new track
    if (isPlaying) {
      audioRef.current.play()
        .then(() => {
          startTimer();
        })
        .catch((error) => {
          console.error("Playback failed:", error);
        });
    }
  }, [currentIndex, audioSrc, isPlaying]); // Add isPlaying to dependencies

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
        .then(() => {
          startTimer();
        })
        .catch((error) => {
          console.error("Playback failed:", error);
        });
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }

    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime);
      if (audioRef.current.ended) {
        handleNext();
      }
    }, 1000);
  };

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(total.length - 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying((prev) => !prev); // Toggle play/pause
  };

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={(trackProgress / audioRef.current.duration) * 100}
          isPlaying={isPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#A0FA9E"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{currentTrack?.album?.artists.map(artist => artist.name).join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{String(Math.floor(trackProgress)).padStart(2, '0')}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            handlePlay={handlePlay}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
