// OrderInfo.tsx
import React from "react";
import OrderForm from "./OrderForm";

const OrderInfo: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full">
    <div className="flex flex-col gap-5 self-center px-5 mt-9 w-full max-w-[1082px] max-md:flex-wrap max-md:max-w-full">
      <div className="flex justify-between w-full flex-wrap gap-3">
        <h2 className="text-xl font-extrabold tracking-wide leading-8 text-slate-900 mb-3">
          المعلومات الخاصة بالطلبية
        </h2>
        <div className="flex gap-3.5 text-sm text-blue-600 whitespace-nowrap">
          <div className="font-black"></div>
        </div>
      </div>
    </div>
    <OrderForm />
  </section>
  );
};

export default OrderInfo;
