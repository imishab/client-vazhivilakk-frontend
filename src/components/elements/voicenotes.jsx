"use client"; // Ensures it only runs on the client

import { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

const VoicePlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0); // Track current time
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      }
    };
  }, [audioSrc]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="d-flex align-items-center gap-2 p-3 bg-[#3c736b] rounded w-100"
      style={{ maxWidth: "400px" }}
    >
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className="btn btn-light border rounded-circle p-2"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Current Time */}
      <span className="small text-white">{formatTime(currentTime)}</span>

      {/* Progress Bar */}
      <div className="flex-grow-1 mt-1 position-relative ">
        <input
          type="range"
          className="form-range text-white"
          value={progress}
          onChange={(e) => {
            if (audioRef.current) {
              const newTime =
                (Number(e.target.value) / 100) * audioRef.current.duration;
              audioRef.current.currentTime = newTime;
              setProgress(Number(e.target.value));
            }
          }}
        />
      </div>

      {/* Total Duration */}
      <span className="small text-white">{formatTime(duration)}</span>
    </div>
  );
};

export default VoicePlayer;
