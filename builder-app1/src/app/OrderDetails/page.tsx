// src/Order/page.tsx
import React from 'react';
import Layout from '../components/Layout/Layout';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import OrderConfirmation from '../components/OrderConfirmation/OrderConfirmation';

const OrderPage: React.FC = () => {
  const orderDetailsProps = {
    orderDate: "2024-07-30",
    company: "شركة المثال",
    orderType: "طلب عبر الإنترنت",
    audioFile: {
      duration: "3:45",
      currentTime: "1:30",
    },
  };
  

  return (
    <Layout>
      <div className="flex flex-col items-center w-full px-10 py-5">
        <OrderDetails {...orderDetailsProps} />
        <OrderConfirmation />
      </div>
    </Layout>
  );
};

export default OrderPage;
