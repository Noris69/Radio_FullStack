"use client";

import React, { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch'; // Adjust the path if necessary

const TimeSlots = () => {
  const [search, setSearch] = useState('');
  const [showReserved, setShowReserved] = useState(true);
  const [showUnreserved, setShowUnreserved] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Date d'aujourd'hui
  const [showModal, setShowModal] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: selectedDate,
    startTime: '',
    endTime: '',
    cost: '',
  });
  
  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlot({
      ...newSlot,
      [name]: value,  // Garde les valeurs telles qu'elles sont (chaînes pour les heures)
    });
  };
  
  const handleCreateSlot = async () => {
    try {
      // Combine correctement la date et l'heure ici avant de les envoyer au serveur
      const startDateTime = new Date(`${newSlot.date}T${newSlot.startTime}`);
      const endDateTime = new Date(`${newSlot.date}T${newSlot.endTime}`);

      const slotToSend = {
        ...newSlot,
        startTime: startDateTime,  // Envoie en tant qu'objet Date complet
        endTime: endDateTime,
      };

      const response = await fetch('https://radio-fullstack.onrender.com/api/slots/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slotToSend),  // send the slot with Date objects
      });
  
      if (response.ok) {
        const createdSlot = await response.json();
        setShowModal(false);
        setNewSlot({ date: selectedDate, startTime: '', endTime: '', cost: '' }); // Reset the form
  
        // Reload the slots for the selected date
        fetchSlots(selectedDate);
      } else {
        console.error('Failed to create slot');
      }
    } catch (error) {
      console.error('Error creating slot:', error);
    }
  };
  
  const fetchSlots = async (date) => {
    try {
      const response = await fetch(`https://radio-fullstack.onrender.com/api/reservations/slots?date=${date}`);
      if (response.ok) {
        const data = await response.json();
        setTimeSlots(data);
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

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleToggle = (id) => {
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

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('ar-MA', options).format(new Date(date));
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{formatDate(selectedDate)}</h1>
        <input 
          type="date" 
          className="border px-3 py-2 rounded-lg" 
          value={selectedDate} 
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
          {[...Array(totalPages).keys()].map((page) => (
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
                  value={newSlot.date}
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
                    value={newSlot.startTime}
                    onChange={handleModalInputChange}
                  />
                  <input
                    type="time"
                    className="border px-3 py-2 rounded-lg"
                    name="endTime"
                    value={newSlot.endTime}
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
