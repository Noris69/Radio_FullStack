import React from "react";

interface AudioPlayerProps {
  currentTime: string;
  duration: string;
  src: string;  // Add src prop for the uploaded audio
}

const AudioPlayers: React.FC<AudioPlayerProps> = ({ currentTime, duration, src }) => {
  return (
    <div className="flex gap-3 self-stretch px-3.5 py-4 mt-11 bg-gray-100 rounded-[200px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
      <audio controls className="w-full">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="my-auto text-sm text-black">{`${currentTime} / ${duration}`}</div>
    </div>
  );
};

export default AudioPlayers;
