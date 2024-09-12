"use client";
import React, { useRef, ReactNode } from "react";
import Header from "./Header";
import Hero from "./Hero";
import PackagesSection from "./PackagesSection";
import BookingSection from "./BookingSection";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const packagesSectionRef = useRef<HTMLDivElement>(null);

  const scrollToPackages = () => {
    if (packagesSectionRef.current) {
      packagesSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col justify-center bg-white">
      <Header />
      <div className="flex flex-col pb-20 w-full bg-white max-md:max-w-full">
        <div className="pt-9 w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col grow items-start px-16 pt-6 pb-20 text-2xl font-bold tracking-tight whitespace-nowrap min-h-[689px] text-slate-900 max-md:px-5 max-md:mt-9 max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/034931a602247de44cad828cb7ce18a655943f3b5b7b425c2ecc50503be1c962?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
                  alt=""
                  className="object-cover absolute inset-0 size-full "
                />
              </div>
            </div>
            <Hero scrollToPackages={scrollToPackages} />
          </div>
        </div>

        {/* PackagesSection remains at its original position */}
        <div ref={packagesSectionRef} className="mx-auto">
          <PackagesSection />
        </div>

        <BookingSection />
      </div>

      {/* This will render the children passed to Layout */}
      {children}
    </div>
  );
};

export default Layout;
