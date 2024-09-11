import React from "react";

interface TimeSlotProps {
  time: string;
  date: string;
  hour: string;
  duration: string;
  price: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, date, hour, duration, price }) => {
  return (
    <div className="flex justify-between w-full mt-4">
      <div className="w-1/5 text-right">{time}</div>
      <div className="w-1/5 text-right">{date}</div>
      <div className="w-1/5 text-right">{duration}</div>
      <div className="w-1/5 text-right">{hour}</div>
      <div className="w-1/5 text-right">{price}</div>
      <button className="w-1/5 text-slate-500">حذف</button>
    </div>
  );
};

export default TimeSlot;
