// src/Order/page.tsx
import React from 'react';
import Layout from '../components/Layout/Layout'; // Ajustez le chemin si nécessaire
import OrderInfo from '../components/OrderInfo/OrderInfo'; // Ajustez le chemin si nécessaire
import { useUser } from '../context/UserContext';

const OrderPage: React.FC = () => {
  
  return (
    <Layout>
      <OrderInfo />
    </Layout>
  );
};

export default OrderPage;
