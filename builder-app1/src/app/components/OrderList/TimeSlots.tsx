"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Slot {
  id: string;
  client: string;
  type: string;
  date: string;
  paymentStatus: string;
  requestStatus: string;
  publishDate: string;
}

const TimeSlots: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [timeSlots, setTimeSlots] = useState<Slot[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('https://radio-fullstack.onrender.com/api/reservations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTimeSlots(data);
        } else {
          console.error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/CommandeDetails?id=${id}`);
  };

  const filteredTimeSlots = timeSlots.filter((slot) => {
    if (activeTab === 'all') return true;
    return slot.type === activeTab;
  });

  const timeSlotsPerPage = 10;
  const indexOfLastSlot = currentPage * timeSlotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - timeSlotsPerPage;
  const currentTimeSlots = filteredTimeSlots.slice(indexOfFirstSlot, indexOfLastSlot);

  const totalPages = Math.ceil(filteredTimeSlots.length / timeSlotsPerPage);

  return (
    <div className="h-screen w-full p-6 bg-white">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 text-sm font-semibold ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('all')}
          >
            جميع الطلبات
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold ${activeTab === 'وحدة' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('وحدة')}
          >
            وحدة
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold ${activeTab === 'باقة' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('باقة')}
          >
            باقة
          </button>
        </div>
        <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg">
          <span className="inline-block align-middle mr-2">تصدير</span>
          <svg
            className="w-5 h-5 inline-block align-middle"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg">
        <table className="min-w-full text-right">
          <thead className="bg-gray-50 text-gray-400">
            <tr>
              <th className="px-4 py-4 text-sm">الزبون</th>
              <th className="px-4 py-4 text-sm">نوع الطلبية</th>
              <th className="px-4 py-4 text-sm">تاريخ الطلبية</th>
              <th className="px-4 py-4 text-sm">حالة الدفع</th>
              <th className="px-4 py-4 text-sm">حالة الطلبية</th>
              <th className="px-4 py-4 text-sm">تاريخ النشر</th>
              <th className="px-4 py-4 text-sm">...</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentTimeSlots.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-100 border-b border-gray-200">
                <td className="px-4 py-3 border-none">{slot.client}</td>
                <td className="px-4 py-3 border-none">{slot.type}</td>

                <td className="px-4 py-3 border-none">{new Date(slot.date).toLocaleDateString('en-GB')}</td>

                <td className="px-4 py-3 border-none">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      slot.paymentStatus === 'تم'
                        ? 'bg-green-100 text-green-700'
                        : slot.paymentStatus === 'ملفي'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {slot.paymentStatus}
                  </span>
                </td>

                <td className="px-4 py-3 border-none">
                  <span
                    className={`px-2 py-1 rounded-lg ${
                      slot.requestStatus === 'مصدق'
                        ? 'bg-green-100 text-green-700'
                        : slot.requestStatus === 'غير مصدق'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {slot.requestStatus}
                  </span>
                </td>

                <td className="px-4 py-3 border-none">{new Date(slot.publishDate).toLocaleDateString('en-GB')}</td>

                <td className="px-4 py-3 border-none font-bold cursor-pointer" onClick={() => handleRowClick(slot.id)}>
                  ...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <select
            className="border px-3 py-2 rounded-lg"
            value={timeSlotsPerPage}
            onChange={(e) => setCurrentPage(1)}
          >
            <option value="10">إظهار 10 طلبات</option>
            <option value="20">إظهار 20 طلبات</option>
            <option value="30">إظهار 30 طلبات</option>
          </select>
        </div>
        <div className="flex space-x-1">
  {Array.from(Array(totalPages).keys()).map((page) => (
    <button
      key={page + 1}
      onClick={() => setCurrentPage(page + 1)}
      className={`border px-3 py-2 rounded-lg ${
        currentPage === page + 1 ? 'bg-blue-600 text-white' : ''
      }`}
    >
      {page + 1}
    </button>
  ))}
</div>

      </div>
    </div>
  );
};

export default TimeSlots;
