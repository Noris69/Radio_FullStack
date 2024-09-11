// src/Order/page.tsx
import React from 'react';
import Layout from '../components/Layout/LayoutMessage';
import ChatListContainer from '../components/ChatList/ChatListContainer';
import OrderConfirmation from '../components/OrderConfirmation/OrderConfirmation';

const MessagePage: React.FC = () => {
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
      <div className="flex flex-col  w-full px-10 py-5">
        <ChatListContainer/>
      </div>
    </Layout>
  );
};

export default MessagePage;
