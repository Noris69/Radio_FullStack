"use client";
import React, { useState, useEffect } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Logo from "./Logo";
import axios from "axios";

const Header: React.FC = () => {
  const [userProfilePic, setUserProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          console.log("User not logged in");
          return;
        }

        // Fetch the user data from the backend
        const response = await axios.get(`https://radio-fullstack.onrender.com/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the user's profile picture or a default image
        setUserProfilePic(response.data.user.profilePic || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="flex gap-5 justify-between px-8 py-5 w-full bg-white max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <Logo />
      <AudioPlayer />

      <div className="flex gap-5 justify-between my-auto">
        {/* Display the user's profile picture with a solid border */}
        <img
          loading="lazy"
          src={userProfilePic || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"} // Fallback to a default profile picture
          alt="User avatar"
          className="shrink-0 my-auto w-10 aspect-square rounded-full border-2 border-solid border-gray-800" // Added solid border
        />
        <div className="flex gap-3">
          {/* Other icons */}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6032c8e8eb2f060213d0012f295f0fa78f1aa1596a48e29795083f858ccbb880?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
            alt=""
            className="shrink-0 my-auto w-4 aspect-square"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
