import React from "react";

const OrderSummary: React.FC = () => {
  return (
    <div className="mt-5 w-full">
      <div className="flex justify-between text-base font-bold tracking-wide text-slate-900">
        <div>5 فضائات إشهارية</div>
        <div>8465 د.م.</div>
      </div>
      <div className="flex justify-between items-center mt-5">
        <button className="underline text-slate-500">إضافة فضاء آخر</button>
        <button className="px-5 py-2 text-white bg-blue-600 rounded-lg">متابعة إلى الدفع</button>
      </div>
    </div>
  );
};

export default OrderSummary;
