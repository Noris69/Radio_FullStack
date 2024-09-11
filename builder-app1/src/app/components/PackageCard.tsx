import React from "react";

interface Feature {
  text: string;
}

interface PackageCardProps {
  title: string;
  price: string;
  description: string;
  features: Feature[];
  isHighlighted?: boolean;
  onSelect: () => void; // Add onSelect prop
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  price,
  description,
  features,
  isHighlighted = false,
  onSelect, // Destructure the onSelect prop
}) => {
  const cardClasses = isHighlighted
    ? "flex flex-col grow px-8 py-5 mx-auto w-full text-white bg-blue-600 rounded-3xl shadow-[0px_42px_34px_rgba(82,67,194,0.296)] max-md:px-5 max-md:mt-9"
    : "flex flex-col pt-3.5 mt-16 max-md:mt-10";

  const buttonClasses = isHighlighted
    ? "px-16 py-3.5 mt-6 text-base font-bold text-center text-blue-600 bg-white rounded-3xl max-md:px-5"
    : "px-16 py-3.5 mt-20 text-base font-bold text-center text-white bg-blue-600 rounded-3xl bg-blend-normal max-md:px-5 max-md:mt-10";

  return (
    <div className={cardClasses}>
      {isHighlighted && (
        <div className="self-end px-8 py-2 text-xs font-extrabold tracking-wider text-center rounded-2xl bg-white bg-opacity-50 max-md:px-5">
          الأكثر إختيارا
        </div>
      )}
      <div
        className={`mt-3.5 text-2xl font-bold ${
          isHighlighted ? "text-white" : "text-indigo-950"
        }`}
      >
        {price}
      </div>
      <div className="flex flex-col pt-2 pl-6 mt-7 text-right max-md:pl-5">
        <div
          className={`text-3xl font-bold ${
            isHighlighted ? "text-white" : "text-indigo-950"
          }`}
        >
          {title}
        </div>
        <div
          className={`self-start mt-3 text-base font-medium ${
            isHighlighted ? "text-white" : "text-slate-500"
          }`}
        >
          <span className="font-bold">{description}</span>
        </div>
      </div>
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex gap-2.5 py-px mt-5 text-base font-medium ${
            isHighlighted ? "text-white" : "text-black"
          }`}
        >
          <img
            loading="lazy"
            src={
              isHighlighted
                ? "https://cdn.builder.io/api/v1/image/assets/TEMP/3cecd5582f318734ab57a11cb8e122bbf78385b53dfe0f4ba0f27819c065c393?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
                : "https://cdn.builder.io/api/v1/image/assets/TEMP/aea8dc73ebef461629309cfa806cdd4404a5f433ac9d20c7e545e0fadb8e143f?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
            }
            alt=""
            className="shrink-0 w-5 aspect-square"
          />
          <div className="flex-auto">{feature.text}</div>
        </div>
      ))}
      <button className={buttonClasses} onClick={onSelect}> {/* Call the onSelect function on click */}
        إﺧﺘﺮ اﻟﺂن
      </button>
    </div>
  );
};

export default PackageCard;
