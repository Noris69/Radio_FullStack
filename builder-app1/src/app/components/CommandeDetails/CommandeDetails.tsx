"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
interface Slot {
  _id: string;
  startTime: Date;
  endTime: Date;
  confirmed: boolean;
  date: string; // Assuming date is a string
}


// Define the Reservation interface
// Update the Reservation interface
interface Reservation {
  _id: string;
  adname: string;
  created_at: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  isPublished: string;
  slots: Slot[];
  user_id: {
    username: string;
  };
  audioFile: string;
  type?: string;  // Add type as an optional field
}


const CommandeDetails = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
 const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null); // Update type to accept string or null
const [selectedDate, setSelectedDate] = useState<Date | null>(null);       // Update type to accept Date or null
const [selectedTime, setSelectedTime] = useState<Date | null>(null);
const timeDifference = selectedDate && selectedTime ? selectedDate.getTime() - selectedTime.getTime() : null;

// Initialize the state with the correct type and default values
const [reservation, setReservation] = useState<Reservation>({
  _id: '',
  adname: '',
  created_at: '',
  totalPrice: 0,
  status: '',
  paymentStatus: '',
  isPublished: '',
  slots: [],  // Initialize with an empty array
  user_id: {
    username: '',
  },
  audioFile: ''
});
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the reservation ID from the URL

  // Après avoir fetch les données de la réservation
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

        // Directement utiliser les slots récupérés avec startTime, endTime, et date
        setReservation(data);
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

  const handleConfirmAudioFile = async () => {
    try {
      const response = await fetch(`https://radio-fullstack.onrender.com/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: 'يتم' }),  // Change the status to "يتم"
      });
  
      if (response.ok) {
        const updatedReservation = await response.json();
        console.log('Updated Reservation:', updatedReservation);  // Check if the data is updated
  
        // Update the reservation state
setReservation(prevReservation => ({
  ...prevReservation,
  slots: prevReservation.slots.map(slot =>
    slot._id === selectedSlotId ? { ...slot, confirmed: true } : slot
  ),
}));
  
        closeConfirmModal();  // Close the modal after successful update
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handlePaymentConfirmation = async () => {
    try {
      const response = await fetch(`https://radio-fullstack.onrender.com/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ paymentStatus: 'يتم' }),  // Change the payment status to "يتم"
      });
  
      if (response.ok) {
        const updatedReservation = await response.json();
        console.log('Updated Reservation:', updatedReservation);  // Check if the data is updated
  
        // Update the reservation state with the new payment status
        setReservation(prevReservation => ({
          ...prevReservation,
          paymentStatus: updatedReservation.paymentStatus,
        }));
  
        closePaymentModal();  // Close the modal after successful update
      } else {
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePublishConfirmation = async () => {
    try {
      const response = await fetch(`https://radio-fullstack.onrender.com/api/reservations/${id}/slot/${selectedSlotId}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const updatedReservation = await response.json();
        console.log('Updated Reservation:', updatedReservation);
  
        // Mettre à jour l'état de la réservation en confirmant uniquement le slot concerné
        setReservation(prevReservation => ({
          ...prevReservation,
          slots: prevReservation.slots.map(slot =>
            slot._id === selectedSlotId ? { ...slot, confirmed: true } : slot
          ),
        }));
  
        closePublishModal(); // Fermer le modal après la mise à jour
      } else {
        console.error('Échec de la mise à jour du slot');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
  
  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const openRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
  };

  const openPublishModal = (slotId: string, date: Date, time: Date) => {
    setSelectedSlotId(slotId); // Store the selected slot ID
    setSelectedDate(date);
    setSelectedTime(time);
  };
  
  
  const closePublishModal = () => {
    setIsPublishModalOpen(false);
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

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
              <div className="flex flex-col md:flex-row justify-start md:justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-4">
              {reservation.status === 'يتم' ? (
    <div className="flex justify-center items-center w-full">
      <span className="bg-green-100 text-green-600 px-4 py-2 rounded-lg">
      تم تأكيد الملف الصوتي 
      </span>
    </div>
  ) : (
    <>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
        onClick={openConfirmModal}
      >
        تأكيد الملف الصوتي
      </button>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
        onClick={openRejectModal}
      >
        رفض الملف الصوتي
      </button>
    </>
  )}
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6 pl-0 md:pl-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">معلومات عن الزبون</h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">الاسم الكامل:</span>
                <span className="font-semibold">{reservation.user_id.username}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">عدد الطلبات السابقة:</span>
                <span className="font-semibold">312</span>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-4 mt-4">
                <a href="#" className="text-red-600">إلغاء الطلبية</a>
                <a href="#" className="text-blue-600">مشاهدة الحساب</a>
                <a href="#" className="text-blue-600">إرسال رسالة</a>
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
                console.log("test 1", slot.date);
  const slotDate = new Date(slot.date);  // Convertir la date reçue en objet `Date`
  console.log("test 2", slotDate);

  return (
    <tr key={index} className="border-b border-gray-200">
      <td className="px-4 py-2">
        {/* Formatage de la date */}
        {slotDate.toLocaleDateString('en-GB')}  {/* Formatage en "jour-mois-année" */}
      </td>
      <td className="px-4 py-2">
        {/* Formatage des heures */}
        {new Date(slot.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} - 
        {new Date(slot.endTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
      </td>
      <td className="px-4 py-2 text-center">
        {slot.confirmed ? (
          <span className="bg-green-100 text-green-600 px-4 py-2 rounded-lg">
            تم النشر
          </span>
        ) : (
          <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => openPublishModal(
            slot._id, 
            slotDate,  // Pass the Date object instead of a string
            new Date(slot.startTime)  // Pass the startTime as a Date object
          )}
        >
          تأكيد النشر
        </button>
        
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
    <button className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4" onClick={openPaymentModal}>
      تأكيد الدفع
    </button>
  )}
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">تأكيد الملف الصوتي</h2>
              <button onClick={closeConfirmModal} className="text-gray-600 hover:text-gray-900">&times;</button>
            </div>
            <p className="my-4">هل أنت موافق على تأكيد هذا الملف الصوتي؟</p>
            <button
              onClick={handleConfirmAudioFile}
              className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
            >
              تأكيد ملف الصوتي
            </button>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">رفض الملف الصوتي</h2>
              <button onClick={closeRejectModal} className="text-gray-600 hover:text-gray-900">&times;</button>
            </div>
            <div className="my-4">
              <label htmlFor="reason" className="block text-gray-700 mb-2">سبب الرفض</label>
              <textarea
  id="reason"
  className="w-full p-2 border border-gray-300 rounded-md"
  rows={4}  // Change to number by removing quotes
  placeholder="المرجو كتابة سبب (رفض الملف الصوتي) (اختياري)"
></textarea>

            </div>
            <button
              onClick={closeRejectModal}
              className="bg-red-600 text-white px-4 py-2 rounded-lg w-full"
            >
              تأكيد الرفض
            </button>
          </div>
        </div>
      )}

      {/* Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">تأكيد النشر</h2>
              <button onClick={closePublishModal} className="text-gray-600 hover:text-gray-900">&times;</button>
            </div>
            <p className="my-4">
             : هل أنت موافق على تأكيد نشر هذا الملف الصوتي للتاريخ التالي 
              <br />
              <strong>
  {selectedDate ? selectedDate.toLocaleDateString() : ''} - {selectedTime ? selectedTime.toLocaleTimeString() : ''}
</strong>            </p>
            <div className="flex justify-between">
              <button
                onClick={closePublishModal}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                لم يتم نشر الإشهار
              </button>
              <button
                onClick={handlePublishConfirmation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                تأكيد نشر ملف الصوتي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">تأكيد الدفع</h2>
              <button onClick={closePaymentModal} className="text-gray-600 hover:text-gray-900">&times;</button>
            </div>
            <p className="my-4 text-center">هل أنت موافق على تأكيد الدفع ؟</p>
            <p className="mb-4 font-bold text-center">كاش باك - X1461SDF8</p>
            <button
              onClick={handlePaymentConfirmation}
              className="bg-green-600 text-white px-4 py-2 rounded-lg w-full"
            >
              تأكيد الدفع
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandeDetails;
