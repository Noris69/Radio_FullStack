"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CommandeUser = () => {
  const [reservation, setReservation] = useState(null);
  const [totalReservations, setTotalReservations] = useState(0); // State for total reservations
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the reservation ID from the URL

  // Fetch reservation details
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`https://radio-fullstack.onrender.com/api/reservations/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Reservation Data:", data);
          setReservation(data);
          setTotalReservations(data.totalReservations || 0); // Set total reservations count
        } else {
          console.error('Failed to fetch reservation details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (id) {
      fetchReservation();
    }
  }, [id]);

  if (!reservation) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div className="relative p-4 md:p-8 bg-gray-50 space-y-6 w-full">
      {/* Première carte : Header et Statut */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 space-y-4 md:space-y-0">
          <h1 className="text-lg md:text-xl font-semibold">{reservation.adname}</h1>
          <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg">تحميل الفاتورة</button>
        </div>
        <p className="mt-2 text-sm text-gray-500">{reservation._id}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 text-center py-4 md:py-6 gap-4">
          <div className="border-r border-gray-200">
            <p className="text-sm font-semibold">النشر</p>
            <p className={`text-lg font-bold ${
              reservation.isPublished === 'لم يتم بعد' ? 'text-blue-600' :
              reservation.isPublished === 'يتم' ? 'text-green-600' :
              reservation.isPublished === 'تم الإلغاء' ? 'text-red-600' : ''
            }`}>
              {reservation.isPublished}
            </p>
          </div>
          <div className="border-r border-gray-200">
            <p className="text-sm font-semibold">الدفع</p>
            <p className={`text-lg font-bold ${
              reservation.paymentStatus === 'لم يتم بعد' ? 'text-blue-600' :
              reservation.paymentStatus === 'يتم' ? 'text-green-600' :
              reservation.paymentStatus === 'تم الإلغاء' ? 'text-red-600' : ''
            }`}>
              {reservation.paymentStatus}
            </p>
          </div>
          <div className="border-r border-gray-200">
            <p className="text-sm font-semibold">المصادقة</p>
            <p className={`text-lg font-bold ${
              reservation.status === 'لم يتم بعد' ? 'text-blue-600' :
              reservation.status === 'يتم' ? 'text-green-600' :
              reservation.status === 'تم الإلغاء' ? 'text-red-600' : ''
            }`}>
              {reservation.status}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">نوعية الطلبية</p>
            <p className="text-lg font-bold">{reservation.type || 'وحدة'}</p>
          </div>
        </div>
      </div>

      {/* Deuxième carte : Informations et détails */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-200 pb-4">
          {/* Colonne gauche */}
          <div className="space-y-6 pr-0 md:pr-8 mb-2">
            <div>
              <h2 className="text-lg font-semibold mb-2">معلومات عامة</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">تاريخ الطلبية:</span>
                <span className="font-semibold">{new Date(reservation.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">الشركة:</span>
                <span className="font-semibold">{reservation.adname}</span>
              </div>
              <div className="flex justify-between mb-12">
                <span className="text-gray-600">الثمن:</span>
                <span className="font-semibold">{reservation.totalPrice} د.م</span>
              </div>
            </div>
            <div className="border-t border-gray-300 my-6"></div>

            <div>
              <h2 className="text-lg font-semibold mb-2">حول الإشهار</h2>
              <div className="flex flex-col items-start mb-4">
                <span className="text-gray-600 mb-2">نوع الطلبية:</span>
                <audio controls className="w-full max-w-md">
                  <source src={reservation.audioFile} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6 pl-0 md:pl-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">معلومات عن الزبون</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">الاسم الكامل:</span>
                <span className="font-semibold">{reservation.adname}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">عدد الطلبات السابقة:</span>
                <span className="font-semibold">{totalReservations}</span> {/* Display total reservations */}
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}

        {/* Section des rendez-vous de النشر et des informations de الدفع */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="pr-0 md:pr-8">
            <h2 className="text-lg font-semibold mb-4">مواعيد النشر ({reservation.slots.length})</h2>
            <table className="min-w-full text-right">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600">التاريخ</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600">الوقت</th>
                  <th className="px-4 py-2 text-sm font-semibold text-gray-600">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {reservation.slots.map((slot, index) => {
                  const slotDate = new Date(slot.date);  // Convertir la date reçue en objet `Date`
                  return (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="px-4 py-2">
                        {slotDate.toLocaleDateString('en-GB')}  {/* Formatage en "jour-mois-année" */}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(slot.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(slot.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {slot.confirmed ? (
                          <span className="bg-green-100 text-green-600 px-4 py-2 rounded-lg">
                            تم النشر
                          </span>
                        ) : (
                          <span className="text-gray-500">لم يتم النشر بعد</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pl-0 md:pl-8 border-l-0 md:border-l border-gray-200">
            <h2 className="text-lg font-semibold mb-4">معلومات عن الدفع</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">نوعية الدفع:</span>
              <span className="font-semibold">كاش باك</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">كود الدفع:</span>
              <span className="font-semibold">X1461SDF8</span>
            </div>
            {reservation.paymentStatus === 'يتم' ? (
              <div className="bg-green-100 text-green-600 px-4 py-2 rounded-lg mt-4 text-center">
                تم الدفع
              </div>
            ) : (
              <span className="text-gray-500">لم يتم الدفع بعد</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandeUser;
