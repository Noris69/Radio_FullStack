"use client";
import React from "react";
import { useMediaQuery } from 'react-responsive';
import LoginForm from "./LoginForm";
import ImageSection from "./ImageSection";

const LoginPage: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define mobile screen size

  return (
    <main className="bg-white min-h-screen flex items-center justify-center">
      <div className="flex gap-5 w-full max-md:flex-col max-md:items-center max-md:justify-center">
        {!isMobile && <ImageSection />}
        <section className="flex flex-col items-center justify-center w-full max-md:w-4/5 mb-12">
          <div className="flex flex-col self-stretch px-5 my-auto max-md:mt-10 max-md:max-w-full">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
