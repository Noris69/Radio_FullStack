import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
  onDateChange: (date: Date) => void;  // Expect a function to be passed as a prop
}

const CustomCalendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<Date | Date[]>(new Date());

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onDateChange(newDate);  // Notify parent component of date change
  };

  return (
    <div className="flex flex-col items-center  text-base text-center text-zinc-900 max-md:mt-10">
      <div className="text-xl mb-6">المرجو إختيار اليوم</div>
      <div className="flex items-center justify-center">
      </div>
      <div className="mt-6">
        <Calendar
          onChange={(newDate: Date) => handleDateChange(newDate)}  // Pass the selected date
          value={date}
          locale="ar-MA"
          next2Label={null}
          prev2Label={null}
        />
      </div>
      <div className="mt-8 font-bold">جميع الأوقات بتوقيت المملكة المغربية</div>
    </div>
  );
};

export default CustomCalendar;
