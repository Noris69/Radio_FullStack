import React from "react";
import TimeSlot from "./TimeSlot";
import OrderSummary from "./OrderSummary";

interface OrderConfirmationProps {}

const OrderConfirmation: React.FC<OrderConfirmationProps> = () => {
  const timeSlots = [
    {
      time: "وقت الظهيرة 1",
      date: "20/10/2024",
      hour: "13:21",
      duration: "30ث",
      price: "1564 د.م.",
    },
    {
      time: "بعد مباراة الرجاء",
      date: "20/10/2024",
      hour: "17:45",
      duration: "30ث",
      price: "1564 د.م.",
    },
    {
      time: "خلال السهرة",
      date: "20/10/2024",
      hour: "19:20",
      duration: "25ث",
      price: "1564 د.م.",
    },
    {
      time: "منتصف الليل",
      date: "20/10/2024",
      hour: "23:53",
      duration: "90ث",
      price: "1564 د.م.",
    },
  ];

  return (
    <main className="flex flex-col px-5 py-5 bg-white rounded-lg shadow-md mt-5 w-full">
      <h1 className="self-start text-xl font-extrabold tracking-wide leading-8 text-slate-900">
        تأكيد الطلبية
      </h1>
      <section className="flex flex-col items-start px-10 py-5 mt-5 w-full text-sm font-bold bg-gray-50 rounded-lg">
        <div className="flex w-full justify-between font-medium ">
          <div className="flex w-full justify-between mr-12 font-bold">
            <div className="w-1/5 text-right">وقت</div>
            <div className="w-1/5 text-right">التاريخ</div>
            <div className="w-1/5 text-right">المدة</div>
            <div className="w-1/5 text-right">الساعة
</div>
            <div className="w-1/5 text-right mr-12">الثمن</div>
          </div>
        </div>
        <div className="flex flex-col w-full font-medium items-start text-left ml-9">
          {timeSlots.map((slot, index) => (
            <TimeSlot key={index} {...slot} />
          ))}
        </div>
        <OrderSummary />
      </section>
    </main>
  );
};

export default OrderConfirmation;
