import React from "react";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-8 py-5 w-full bg-white">
      <Logo />
      <div className="flex-grow flex justify-between items-center mx-12">
        <h1 className="text-xl font-bold">الرسائل</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          
         + جديد بالمسار 
        </button>
      </div>
      <div className="flex items-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cefb4bb74141f958c33defe2b063d029767721da1d5c11cb80f9350a56ef1162?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/445a0e6a5834516ee95245b8c7da31525f8dc3dc3e9a9b261500ef069c4e193b?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
            alt=""
            className="shrink-0 w-10 aspect-square"
          />
        <div className="flex gap-3 ml-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6032c8e8eb2f060213d0012f295f0fa78f1aa1596a48e29795083f858ccbb880?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
            alt="Bell icon"
            className="w-6 h-6"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
