import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
  onDateChange: (date: Date) => void;  // The parent expects a single Date
}

const CustomCalendar: React.FC<CalendarProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());

  const handleDateChange = (newDate: Date | [Date, Date] | null) => {
    if (Array.isArray(newDate)) {
      onDateChange(newDate[0]);  // Handle range selection by using the first date
    } else if (newDate instanceof Date) {
      onDateChange(newDate);  // Handle single date selection
    }
    setDate(newDate);  // Update the state with the new date
  };

  return (
    <div className="flex flex-col items-center text-base text-center text-zinc-900 max-md:mt-10">
      <div className="text-xl mb-6">المرجو إختيار اليوم</div>
      <div className="mt-6">
        <Calendar
          onChange={(newDate) => handleDateChange(newDate as Date | [Date, Date] | null)}  // Use the correct handler
          value={date}                 // Pass current date or range
          locale="ar-MA"               // Set the locale for the calendar
          next2Label={null}            // Hide the next2 button
          prev2Label={null}            // Hide the prev2 button
        />
      </div>
      <div className="mt-8 font-bold">جميع الأوقات بتوقيت المملكة المغربية</div>
    </div>
  );
};

export default CustomCalendar;
