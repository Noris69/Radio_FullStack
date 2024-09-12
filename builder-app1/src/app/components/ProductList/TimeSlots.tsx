"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import ToggleSwitch from './ToggleSwitch'; // Adjust the path if necessary
import { format } from 'date-fns';
import { ar } from 'date-fns/locale'; // Importez la locale arabe directement de date-fns

interface Slot {
  _id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  reserved: boolean;
  client: string;
  cost: number;
}

const TimeSlots: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [showReserved, setShowReserved] = useState<boolean>(true);
  const [showUnreserved, setShowUnreserved] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [timeSlots, setTimeSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Date object
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newSlot, setNewSlot] = useState<Slot>({
    _id: '',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    duration: 0,
    reserved: false,
    client: '',
    cost: 0,
  });

  const handleModalInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSlot({
      ...newSlot,
      [name]: name === 'cost' || name === 'duration' ? Number(value) : value,
    });
  };

  const handleCreateSlot = async () => {
    try {
      const response = await fetch('https://radio-fullstack.onrender.com/api/slots/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSlot),
      });

      if (response.ok) {
        setShowModal(false);
        setNewSlot({ ...newSlot, startTime: new Date(), endTime: new Date(), cost: 0 });
        fetchSlots(selectedDate);
      } else {
        console.error('Failed to create slot');
      }
    } catch (error) {
      console.error('Error creating slot:', error);
    }
  };

  const fetchSlots = async (date: Date) => {
    try {
      const response = await fetch(`https://radio-fullstack.onrender.com/api/reservations/slots?date=${date.toISOString()}`);
      if (response.ok) {
        const data = await response.json();
        // Assuming the response contains date strings, convert them back to Date objects
        const formattedSlots = data.map((slot: any) => ({
          ...slot,
          date: new Date(slot.date),
          startTime: new Date(slot.startTime),
          endTime: new Date(slot.endTime),
        }));
        setTimeSlots(formattedSlots);
      } else {
        console.error('Failed to fetch time slots');
      }
    } catch (error) {
      console.error('Error fetching time slots:', error);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleToggle = (id: string) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot._id === id ? { ...slot, reserved: !slot.reserved } : slot
      )
    );
  };

  const timeSlotsPerPage = 10;
  const indexOfLastSlot = currentPage * timeSlotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - timeSlotsPerPage;
  const currentTimeSlots = timeSlots.slice(indexOfFirstSlot, indexOfLastSlot);

  const totalPages = Math.ceil(timeSlots.length / timeSlotsPerPage);

  const formatDate = (date: Date) => {
    // Utiliser des options pour obtenir le jour de la semaine, le jour, le mois et l'année
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',  // Nom complet du jour de la semaine
      year: 'numeric',  // Année complète
      month: 'long',    // Nom complet du mois
      day: 'numeric',   // Jour du mois
    };
    return new Intl.DateTimeFormat('ar-MA', options).format(date);
  };
  
  return (
    <div className="h-screen w-full flex flex-col p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{formatDate(selectedDate)}</h1>
      <input 
          type="date" 
          className="border px-3 py-2 rounded-lg" 
          value={selectedDate.toISOString().split('T')[0]} 
          onChange={handleDateChange} 
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          + إضافة توقيت
        </button>
      </div>

      {/* Slot list */}
      <div className="flex-grow overflow-auto no-scrollbar">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-1 py-2">التوقيت</th>
              <th className="px-1 py-2">المدة</th>
              <th className="px-1 py-2">الساعة</th>
              <th className="px-1 py-2">الحجز</th>
              <th className="px-1 py-2">الزبون</th>
              <th className="px-1 py-2">الثمن</th>
              <th className="px-1 py-2">الحالة</th>
              <th className="px-1 py-2">...</th>
            </tr>
          </thead>
          <tbody>
            {currentTimeSlots
              .filter(
                (slot) =>
                  (showReserved && slot.reserved) ||
                  (showUnreserved && !slot.reserved)
              )
              .map((slot) => (
                <tr key={slot._id} className="border-b">
                  <td className="px-12 py-2">{formatDate(slot.date)}</td>
                  <td className="px-12 py-2">{slot.duration}</td>
                  <td className="px-12 py-2">{new Date(slot.startTime).toLocaleTimeString()}</td>
                  <td className="px-12 py-2">
                    <span className={`px-2 py-1 rounded-lg ${slot.reserved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {slot.reserved ? 'محجوز' : 'غير محجوز'}
                    </span>
                  </td>
                  <td className="px-12 py-2">{slot.client || '-'}</td>
                  <td className="px-12 py-2">{slot.cost}</td>
                  <td className="px-12 py-2">
                    <ToggleSwitch isOn={slot.reserved} handleToggle={() => handleToggle(slot._id)} />
                  </td>
                  <td className="px-4 py-2">...</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <select
            className="border px-3 py-2 rounded-lg"
            value={timeSlotsPerPage}
            onChange={(e) => setCurrentPage(1)}
          >
            <option value="10">10 أوقات</option>
            <option value="20">20 أوقات</option>
            <option value="30">30 أوقات</option>
          </select>
        </div>
        <div className="flex space-x-1">
        {[...Array(totalPages)].map((_, index) => (
    <button
      key={index + 1}
      onClick={() => setCurrentPage(index + 1)}
      className={`border px-3 py-2 rounded-lg ${
        currentPage === index + 1 ? 'bg-blue-600 text-white' : ''
      }`}
    >
      {index + 1}
    </button>
  ))}
        </div>
      </div>

      {/* Modal for adding new time slots */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">أضف توقيتاً جديداً</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <label>التاريخ</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  name="date"
                  value={newSlot.date.toISOString().split('T')[0]} // Convert Date to string
                  onChange={handleModalInputChange}
                />
              </div>
              <div>
                <label>التوقيت</label>
                <div className="flex space-x-2">
                  <input
                    type="time"
                    className="border px-3 py-2 rounded-lg"
                    name="startTime"
                    value={newSlot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} // Convert Date to string
                    onChange={handleModalInputChange}
                  />
                  <input
                    type="time"
                    className="border px-3 py-2 rounded-lg"
                    name="endTime"
                    value={newSlot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} // Convert Date to string
                    onChange={handleModalInputChange}
                  />
                </div>
              </div>
              <div>
                <label>الثمن</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  name="cost"
                  value={newSlot.cost}
                  onChange={handleModalInputChange}
                  placeholder="إدخال الثمن"
                />
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleCreateSlot}
              >
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
