import React, { useEffect, useState } from 'react';

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  cost: string;
}

interface TimeSlotProps {
  duration: string;
  time: string;
  price: string;
  isSelected?: boolean;
  onSelect: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ duration, time, price, isSelected = false, onSelect }) => {
  const containerClasses = isSelected
    ? "flex flex-col justify-center p-4 bg-purple-50 rounded-lg border mb-3 border-purple-300 border-solid max-md:max-w-full cursor-pointer"
    : "flex flex-col justify-center p-4 bg-white rounded-lg border mb-3 border-gray-300 border-solid max-md:max-w-full cursor-pointer";

  const checkboxClasses = isSelected
    ? "shrink-0 self-start w-4 h-4 border border-violet-500 border-solid aspect-square bg-violet-500 rounded-lg"
    : "shrink-0 self-start w-4 h-4 bg-white rounded-lg border border-gray-300 border-solid";

  const priceClasses = isSelected
    ? "text-purple-900 font-bold"
    : "text-gray-500 font-medium";

  return (
    <div className={containerClasses} onClick={onSelect}>
      <div className="flex gap-4 justify-between max-md:flex-wrap">
        <div className="flex flex-col flex-1 max-md:max-w-full">
          <div className={`font-medium ${isSelected ? 'text-violet-900' : 'text-violet-900'} max-md:max-w-full`}>
            {duration} {/* Display the duration */}
          </div>
          <div className={`${isSelected ? 'text-violet-500' : 'text-slate-600'} max-md:max-w-full`}>
            {time}
          </div>
        </div>
        <div className={priceClasses}>
          {price} درهم مغربي
        </div>
        {isSelected ? (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cfc2931fa68c5356435f155a8728dafd8b3ef72bcd78f6cefa58cd4647b7aab?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
            alt=""
            className={checkboxClasses}
          />
        ) : (
          <div className={checkboxClasses} />
        )}
      </div>
    </div>
  );
};


export default TimeSlot;
