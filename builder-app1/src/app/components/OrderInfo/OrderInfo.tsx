// OrderInfo.tsx
import React from "react";
import OrderForm from "./OrderForm";

const OrderInfo: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col gap-5 self-center px-5 mt-9 w-full max-w-[1082px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex justify-between w-full">
          <h1 className="text-xl font-extrabold tracking-wide leading-8 text-slate-900">
            المعلومات الخاصة بالطلبية
          </h1>
          <div className="flex gap-3.5 text-sm text-blue-600 whitespace-nowrap">
            <div className="font-semibold">العودة</div>
            <div className="font-black"></div>
          </div>
        </div>
      </div>
      <OrderForm />
    </section>
  );
};

export default OrderInfo;
