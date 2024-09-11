import React from "react";

const AudioPlayer: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full p-4">
      <audio controls className="w-full max-w-md">
        <source src="https://radiomars.ice.infomaniak.ch/radiomars-128.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
