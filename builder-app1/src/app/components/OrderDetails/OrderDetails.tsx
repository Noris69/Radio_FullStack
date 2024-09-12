"use client";
import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseConfig"; // Adjust the import path
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const OrderDetails: React.FC = () => {
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const audioFile = event.target.files[0];
      const storageRef = ref(storage, `audios/${audioFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, audioFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadedAudioUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <section className="flex flex-col w-full px-6 py-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-extrabold tracking-wide leading-8 text-slate-900">
          حول الطلبية
        </h1>
        <button className="text-blue-600">العودة</button>
      </div>
      <div className="flex justify-between items-start gap-10 px-10 py-5 mt-4 bg-gray-50 rounded-lg w-full">
        <div className="flex flex-col text-right">
          <h2 className="text-base font-bold tracking-wide leading-6 text-slate-900">
            الملف الصوتي
          </h2>
          <div className="mt-3">
            {uploadedAudioUrl ? (
              <AudioPlayer src={uploadedAudioUrl} />
            ) : (
              <div>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="mt-3"
                />
                {uploadProgress > 0 && (
                  <div>Upload progress: {Math.round(uploadProgress)}%</div>
                )}
              </div>
            )}
          </div>
          {uploadedAudioUrl && (
            <button
              className="self-end text-sm mt-5 font-bold leading-6 underline text-slate-500"
              onClick={() => setUploadedAudioUrl(null)}
            >
              تغيير الملف الصوتي
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
