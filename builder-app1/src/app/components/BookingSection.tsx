import React, { useState } from "react";
import CustomCalendar from "./Calendar";
import TimeSlotList from "./TimeSlotList";
import { useRouter } from "next/navigation"; 

interface Slot {
  _id: string;
  startTime: Date;
  endTime: Date;
  cost: string;
  date: Date;
}

const BookingSection: React.FC = () => {
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const router = useRouter(); 

  const handleSelectionChange = (slot: Slot, isSelected: boolean) => {
    if (isSelected) {
      setSelectedSlots((prev) => [...prev, slot]);
      setSelectedPrices((prev) => [...prev, parseInt(slot.cost)]);
    } else {
      setSelectedSlots((prev) => prev.filter((s) => s._id !== slot._id));
      setSelectedPrices((prev) => prev.filter((p) => p !== parseInt(slot.cost)));
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBooking = () => {
    const slotsToStore = selectedSlots.map(slot => slot._id);
    localStorage.setItem("selectedSlots", JSON.stringify(slotsToStore));
    localStorage.setItem("totalPrice", totalPrice.toString());
    localStorage.setItem("orderType", "slot");

    router.push("/Order");
  };

  const totalPrice = selectedPrices.reduce((acc, price) => acc + price, 0);

  return (
    <section className="flex flex-col self-stretch px-14 pt-9 pb-3 bg-white rounded-lg max-md:px-5 max-md:max-w-full">
      <h2 className="mt-28 text-5xl font-bold text-center capitalize text-indigo-950 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        إختر مواقيتك حسب رغبتك
      </h2>
      <p className="self-center text-lg font-semibold text-center text-gray-500 max-md:max-w-full">
        نقدم باقات إعلانات إذاعية بأسعار تنافسية ومواقع متميزة لضمان وصول
        رسالتكم إلى الجمهور المستهدف
        <br />
        بكفاءة. استمتعوا بتكاليف أقل وتغطية أوسع مع باقاتنا المصممة لتحقيق أفضل
        النتائج.
      </p>
      <div className="mt-12 flex gap-5 items-start justify-between w-full max-md:flex-col">
        <div className="w-[60%] max-md:w-full">
          <TimeSlotList
            onSelectionChange={handleSelectionChange}
            selectedDate={selectedDate}
          />
        </div>
        <div className="w-[35%] max-md:w-full">
          <CustomCalendar onDateChange={handleDateChange} />
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-12 w-full text-xl tracking-wide max-w-[1006px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full self-center">
        <div className="flex flex-col px-2">
          <div className="font-medium text-zinc-900 text-opacity-60">
            عدد الفواصل
          </div>
          <div className="self-center mt-2.5 font-bold leading-[150%] text-slate-900">
            {selectedSlots.length}
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca13ac7491458cfc3dc8090670914ddd715cc623a177e81ffa32c98871efa1a3?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
          alt=""
          className="self-end mt-14 w-full border border-solid border-black border-opacity-10 max-md:mt-10 max-md:max-w-full"
        />
        <div className="flex flex-col px-2 max-md:px-5">
          <div className="font-medium text-zinc-900 text-opacity-60">
            الثمن النهائي
          </div>
          <div className="mt-2.5 font-bold leading-[150%] text-slate-900">
            {totalPrice} د.م.
          </div>
        </div>
      </div>
      <button
        className="self-center px-6 pt-6 pb-3.5 mt-9 text-xl font-black text-white bg-blue-600 rounded-xl shadow-[0px_20px_35px_rgba(37,99,235,0.24)] max-md:px-5"
        onClick={handleBooking} 
      >
        قم بالحجز الآن
      </button>
    </section>
  );
};

export default BookingSection;
