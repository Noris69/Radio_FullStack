import React, { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface AudioUploadProps {
  label: string;
  onFileSelect: (file: File | null, duration: number) => void; // Add duration as a second parameter
  audioUrl: string | null;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ label, onFileSelect, audioUrl }) => {
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Create a temporary audio element to calculate the duration
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        const duration = Math.floor(audio.duration); // Get duration in seconds
        setAudioDuration(duration);
        onFileSelect(file, duration); // Pass the file and duration
      };
    }
  };

  return (
    <div className="mb-6">
      <label className="text-sm font-bold leading-6 text-slate-900 block mb-2">
        {label}
      </label>
      <div className="flex gap-5 mt-6 max-md:flex-wrap">
        {audioUrl ? (
          <AudioPlayer src={audioUrl} autoPlay={false} />
        ) : (
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="mt-3"
          />
        )}
        {audioUrl && (
          <button
            className="flex-auto my-auto text-sm font-bold leading-6 underline text-slate-500"
            onClick={() => onFileSelect(null, 0)} // Reset duration to 0
          >
            تغيير الملف الصوتي
          </button>
        )}
      </div>
      {audioDuration > 0 && (
        <p className="text-sm font-medium text-slate-600">
          Duration: {Math.floor(audioDuration / 60)} minutes {audioDuration % 60} seconds
        </p>
      )}
    </div>
  );
};

export default AudioUpload;
