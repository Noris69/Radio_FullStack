"use client";
import React from "react";

const Hero: React.FC<{ scrollToPackages: () => void }> = ({ scrollToPackages }) => {
  return (
    <section
      className="flex flex-col ml-5 w-[51%] max-md:ml-0 max-md:w-full relative"
      style={{
        backgroundImage: `url('/assets/test.png')`,
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <div className="flex flex-col grow items-end px-5 mt-3 max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col max-w-full w-[395px]">
          <div className="mt-36 text-xl font-bold text-right text-blue-600 uppercase max-md:mt-10">
            تريد إعطاع إضافة لمشروعك ؟
          </div>
        </div>
        <h1 className="self-stretch mt-7 text-6xl font-bold tracking-tighter text-right leading-[89px] text-indigo-950 max-md:max-w-full max-md:text-4xl max-md:leading-[61px]">
          الحل موجود الآن <br /> في دقيقة واحدة <br /> أنشر إعلانك على محطتنا
        </h1>
        <div className="flex flex-col mt-11 max-w-full text-right w-[603px] max-md:mt-10">
          <p className="text-base font-medium leading-8 text-gray-500 max-md:max-w-full">
            يمكنك الاختيار من بين خياراتنا المتعددة على التقويم، وكذلك اختيار
            إحدى باقاتنا المصممة خصيصًا لعملائنا.
          </p>
          <button
            onClick={scrollToPackages} // Call the scroll function
            className="self-end px-6 pt-6 pb-3.5 mt-9 text-xl font-black text-white bg-blue-600 rounded-xl shadow-[0px_20px_35px_rgba(37,99,235,0.24)] max-md:px-5"
          >
            قم بالحجز الآن
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
