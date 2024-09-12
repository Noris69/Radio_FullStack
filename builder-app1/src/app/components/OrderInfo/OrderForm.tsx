"use client";
import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import AudioUpload from "./AudioUpload";
import Notification from "./Notification";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { storage } from "./firebaseConfig";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

const OrderForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [adName, setAdName] = useState<string>("");
  const [adDomaine, setAdDomaine] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isReservationSuccessful, setIsReservationSuccessful] = useState<boolean>(false);
  const [isConfirmationStep, setIsConfirmationStep] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null); // Store selected package

  const radiocashcode = "61609574108631";
  const [totalPrice, setTotalPrice] = useState<string>("0");

  interface Slot {
    _id: string;
    startTime: string;
    endTime: string;
    cost: string;
    date: string;
  }
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== "undefined") {
      const orderType = localStorage.getItem("orderType");
      setTotalPrice(localStorage.getItem("totalPrice") || "0");

      if (orderType === "package") {
        const storedPackage = JSON.parse(localStorage.getItem("selectedPackage") || "{}");
        setSelectedPackage(storedPackage);
      } else {
        const storedSlotsIds = JSON.parse(localStorage.getItem("selectedSlots") || "[]");
        const fetchSlotDetails = async () => {
          try {
            const response = await fetch("https://radio-fullstack.onrender.com/api/slots");
            const allSlots = await response.json();
            const filteredSlots = allSlots.filter((slot: Slot) => storedSlotsIds.includes(slot._id));
            setSelectedSlots(filteredSlots);
          } catch (error) {
            console.error("Error fetching slots:", error);
          }
        };
        fetchSlotDetails();
      }
    }
  }, []);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleSave = async () => {
    if (selectedFile) {
      const audioRef = storageRef(storage, `audio/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(audioRef, selectedFile);

      setIsUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          setNotification({ message: "Erreur lors de la création de la réservation", type: "error" });
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Ensure this runs only on the client-side
          if (typeof window !== "undefined") {
            const userId = localStorage.getItem("userId"); // Fetch the logged-in user's ID from localStorage

            let reservationData;
            if (selectedPackage) {
              reservationData = {
                user_id: userId, // Use the dynamic userId
                package: selectedPackage,
                adname: adName,
                addomaine: adDomaine,
                totalPrice:selectedPackage.cost,
                audioFile: downloadURL,
                audioDuration,
              };
            } else {
              const slotIds = selectedSlots.map((slot) => slot._id);
              reservationData = {
                user_id: userId, // Use the dynamic userId
                slots: slotIds,
                adname: adName,
                addomaine: adDomaine,
                totalPrice,
                audioFile: downloadURL,
                audioDuration,
              };
            }

            try {
              const response = await fetch("https://radio-fullstack.onrender.com/api/reservations/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(reservationData),
              });

              const data = await response.json();
              if (response.ok) {
                setNotification({ message: "La réservation a bien été réalisée", type: "success" });
                setIsReservationSuccessful(true);

                // Clear localStorage after reservation
                localStorage.removeItem("selectedSlots");
                localStorage.removeItem("selectedPackage");
                localStorage.removeItem("orderType");
              } else {
                setNotification({ message: data.msg || "Erreur lors de la création de la réservation", type: "error" });
              }
            } catch (error) {
              console.error("Error during reservation creation:", error);
              setNotification({ message: "Erreur lors de la création de la réservation", type: "error" });
            } finally {
              setIsUploading(false);
            }
          }
        }
      );
    } else {
      console.warn("No file selected for upload");
    }
  };

  const handleFileSelect = (file: File | null, duration: number) => {
    setSelectedFile(file);
    setAudioDuration(duration);
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    } else {
      setAudioUrl(null);
    }
  };

  const formatDate = (date: Date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("en-GB").format(date);
  };

  const todayDate = formatDate(new Date());

  if (isReservationSuccessful) {
    const displayPrice = selectedPackage ? selectedPackage.cost : totalPrice;

    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-4 bg-white">
        <h1 className="text-2xl font-bold mb-4">تم قبول الطلبية بنجاح</h1>
        <p className="mb-4">يتعين عليك الآن الذهاب إلى أقرب مركز وٱفاكاش من أجل أداء المبلغ المطلوب و المتمثل في:</p>
        <p className="text-3xl font-bold text-blue-600 mb-4">{displayPrice} درهم مغربي</p>
        <p className="mb-4">المرجو الإدلاء بالعوان التالي أثناء الأداء:</p>
        <p className="text-xl font-bold">Radio Online. N° : {radiocashcode}</p>
        <p className="mb-4">بعد الأداء المرجو إدخال الكود في الخانة المخصصة في</p>
        <a href="#" className="text-blue-500 mb-4">طلباتي الحالية</a>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={goToHome}>
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    );
  }

  return (
    <>
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={handleCloseNotification} />
      )}

      {isConfirmationStep ? (
        <div className="w-full space-y-6">
          {/* Premier Container */}
          <section className="flex flex-row justify-between items-start bg-white p-6 rounded-lg shadow-md">
            <div className="w-1/2 flex flex-col space-y-4">
              <div className="flex items-center">
                <h3 className="text-sm font-bold leading-6 text-gray-500 mr-4">إسم الإشهار:</h3>
                <p className="text-sm font-medium text-gray-800">{adName}</p>
              </div>
              <div className="flex items-center">
                <h3 className="text-sm font-bold leading-6 text-gray-500 mr-4">الميدان:</h3>
                <p className="text-sm font-medium text-gray-800">{adDomaine}</p>
              </div>
              <div className="flex items-center">
                <h3 className="text-sm font-bold leading-6 text-gray-500 mr-4">تاريخ اليوم:</h3>
                <p className="text-sm font-medium text-gray-800">{todayDate}</p>
              </div>
            </div>

            <div className="w-px bg-gray-300 mx-4 h-full"></div> {/* Solid Separator */}

            <div className="w-1/2 flex flex-col items-center">
              <h2 className="text-base font-bold tracking-wide leading-6 text-slate-900 text-center mb-2">الملف الصوتي</h2>
              <div className="mt-3">{audioUrl ? <AudioPlayer src={audioUrl}  /> : <p className="text-gray-600">لم يتم تحميل ملف صوتي.</p>}</div>
            </div>
          </section>
          <h2 className="text-xl font-extrabold tracking-wide leading-8 text-slate-900">تأكيد الطلبية</h2>

          <section className="w-full bg-white p-6 rounded-lg shadow-md">

            {selectedPackage ? (
              // If a package is selected, display package data
              <div className="mt-4">
              <p className="flex justify-between font-bold">
                <span>اسم الباقة:</span>
                <span className="font-normal">{selectedPackage.name}</span>
              </p>
              <p className="flex justify-between font-bold">
                <span>تكلفة الباقة:</span>
                <span className="font-normal">{selectedPackage.cost} د.م.</span>
              </p>
              <p className="flex justify-between font-bold">
                <span>مدة الباقة:</span>
                <span className="font-normal">{selectedPackage.duration}</span>
              </p>
              <p className="flex justify-between font-bold">
                <span>مدة الإعلان:</span>
                <span className="font-normal">{selectedPackage.adLength} ثواني</span>
              </p>
            </div>
            
            
            ) : (
              // Otherwise, show slots data
              <table className="min-w-full bg-white mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">التاريخ</th>
                    <th className="px-4 py-2">الساعة</th>
                    <th className="px-4 py-2">الثمن</th>
                    <th className="px-4 py-2">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSlots.map((slot, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{new Date(slot.date).toLocaleDateString("en-GB")}</td>
                      <td className="px-4 py-2">
                        {new Date(slot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                        {new Date(slot.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-4 py-2">{slot.cost} درهم</td>
                      <td className="px-4 py-2 text-red-600 cursor-pointer">حذف</td>
                    </tr>
                  ))}
                </tbody>
                <p className="text-lg font-bold">المجموع: {totalPrice} درهم</p>
              </table>
            )}

           
          </section>

          {/* Second Container */}
          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-4"
              onClick={() => setIsConfirmationStep(false)}
            >
              تعديل
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={handleSave}
              disabled={isUploading}
            >
              {isUploading ? `تحميل ${Math.round(progress)}%` : "إرسال"}
            </button>
          </div>
        </div>
      ) : (
        <form className="flex flex-col px-9 py-10 mx-8 mt-8 bg-white rounded-xl max-md:px-5 max-md:mr-2.5 max-md:max-w-full">
        <FormField label="إسم الإشهار" placeholder="إشهار قهوة المهدي" value={adName} onChange={(e) => setAdName(e.target.value)} />
        <FormField
          label="الميدان"
          placeholder="المرجو إختيار الميدان"
          value={adDomaine}
          onChange={(e) => setAdDomaine(e.target.value)}
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/206b890c619ec5dfdf9713f67417d2025db0858a5238a74de0f525e58df6ee02?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
        />
        <AudioUpload label="الملف الصوتي" onFileSelect={handleFileSelect} audioUrl={audioUrl} />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsConfirmationStep(true)}
          >
            معاينة
          </button>
        </form>
      )}
    </>
  );
};

export default OrderForm;
