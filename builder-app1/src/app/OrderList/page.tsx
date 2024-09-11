// src/Order/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import Layout from '../components/Layout/LayoutPackageList'; // Adjust the path if necessary
import TimeSlots from '../components/OrderList/TimeSlots'; // Adjust the path if necessary
import axios from 'axios';

const TimeSlotsPage: React.FC = () => {
  const router = useRouter(); // Use the hook from next/navigation
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          router.push('/'); // Redirect if no token or user ID
          return;
        }

        // Fetch user data to check role
        const response = await axios.get(`https://radio-fullstack.onrender.com/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use Bearer token for authorization
          },
        });

        const { role } = response.data.user;
        
        if (role === 'admin') {
          setIsAdmin(true);
        } else {
          router.push('/'); // Redirect if not an admin
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while checking
  }

  if (!isAdmin) {
    return null; // If not admin, don't render anything
  }

  return (
    <Layout>
      <TimeSlots />
    </Layout>
  );
};

export default TimeSlotsPage;
