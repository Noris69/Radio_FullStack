import React, { useState, useEffect } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import Logo from "./Logo";
interface User {
  profilePic: string;
}
const HeaderProductList: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);  // Set user type

  // Fetch the user profile data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`https://radio-fullstack.onrender.com/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="flex gap-5 justify-between items-center px-8 py-5 w-full bg-white max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <Logo />
      <div className="flex-grow">
        <h1 className="text-2xl font-bold">توقيت الإشهارات</h1>
        <p className="text-gray-500">ستجد جميع المعلومات حول أوقات الإعلانات على محطة الراديو.</p>
      </div>
      <div className="flex gap-5 items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="إبحث عن أي شيء..."
            className="px-4 py-2 border rounded-lg w-full max-w-xs"
          />
          <svg
            className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l-2 2m-2 0a8 8 0 1114-6 8 8 0 01-6 6zm5-1a5 5 0 100-10 5 5 0 000 10z"
            ></path>
          </svg>
        </div>

        {/* Display user profile picture */}
        {user ? (
          <img
            loading="lazy"
            src={user.profilePic || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
            alt="User avatar"
            className="shrink-0 w-10 aspect-square rounded-full border border-gray-300"
          />
        ) : (
          <p>Loading...</p>
        )}

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cefb4bb74141f958c33defe2b063d029767721da1d5c11cb80f9350a56ef1162?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
          alt="User avatar"
          className="shrink-0 my-auto w-10 aspect-square rounded-full"
        />
      </div>
    </header>
  );
};

export default HeaderProductList;
