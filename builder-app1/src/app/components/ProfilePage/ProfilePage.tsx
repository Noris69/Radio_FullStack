import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";  // Import useRouter for navigation and useSearchParams

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState(null);
  const [currentReservations, setCurrentReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();  // Use the Next.js router for navigation
  const searchParams = useSearchParams(); // Use useSearchParams from Next.js for query params
  const userId = searchParams.get("userId");  // Get userId from query params

  // Added useEffect to ensure re-render on userId update
  useEffect(() => {
    if (!userId) return;  // If userId is not available, return early
    
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://radio-fullstack.onrender.com/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setCurrentReservations(data.currentOrders || []);
          setPastReservations(data.previousOrders || []);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, [userId]);  // Ensure this effect re-runs when userId changes

  const handleReservationClick = (reservationId: string) => {
    if (!user) return;

    if (user.role === "annonceur") {
      router.push(`/CommandeUser?id=${reservationId}`);
    } else if (user.role === "admin") {
      router.push(`/CommandeDetails?id=${reservationId}`);
    }
  };

  const handleImageClick = () => {
    document.getElementById("profilePicInput")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await fetch(`https://radio-fullstack.onrender.com/api/users/${userId}/uploadProfilePic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          profilePic: data.profilePic,
        }));
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;  // Show loading indicator while fetching data
  }

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto p-6 bg-[#f7f9fc] rounded-lg">
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="w-full lg:w-1/3 p-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={user.profilePic || "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
              alt="User Profile"
              className="mb-4 h-16 w-16 rounded-lg border border-solid border-gray-300 cursor-pointer"
              onClick={handleImageClick}
              style={{ width: "64px", height: "64px" }}
            />
            <h1 className="text-xl font-bold mb-2 text-center">{user.username}</h1>
            <p className="text-slate-500 text-center">{user.email}</p>
          </div>

          <input
            type="file"
            id="profilePicInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />

          <div className="mt-6">
            <p className="font-bold">الاسم الكامل</p>
            <p className="text-slate-600 mb-4">{user.username}</p>
            <p className="font-bold">البريد الإلكتروني</p>
            <p className="text-slate-600 mb-4">{user.email}</p>
            <p className="font-bold">رقم الهاتف</p>
            <p className="text-slate-600 mb-4">{user.phone}</p>
            <p className="font-bold">الدور</p>
            <p className="text-slate-600 mb-4">{user.role}</p>
          </div>
        </div>

        <div className="w-full lg:w-2/3 p-4">
          {/* Current Orders */}
          <div className="mb-6">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h2 className="text-lg font-bold mb-4">الطلبات الحالية</h2>

              {currentReservations?.length > 0 ? (
                currentReservations.map((res, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-2 mt-4 cursor-pointer"
                    onClick={() => handleReservationClick(res._id)}  // Navigate when clicked
                  >
                    <p className="font-bold">{res.adname}</p>
                    <p className="text-[#94A3B8]">{new Date(res.created_at).toLocaleDateString()}</p>
                    <p className="text-[#2563EB] bg-[#E9EFFD] p-1 rounded-md text-center hidden md:block">{res.status}</p>
                  </div>
                ))
              ) : (
                <p>لا توجد طلبات حالية.</p>
              )}
            </div>
          </div>

          {/* Previous Orders */}
          <div className="mb-6">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h2 className="text-lg font-bold mb-4">طلباتي السابقة</h2>

              {pastReservations?.length > 0 ? (
                pastReservations.map((res, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 md:grid-cols-3 gap-2 ml-2 mt-4 cursor-pointer"
                    onClick={() => handleReservationClick(res._id)}  // Navigate when clicked
                  >
                    <p className="font-bold">{res.adname}</p>
                    <p className="text-[#94A3B8]">{new Date(res.created_at).toLocaleDateString()}</p>
                    <p
                      className={`text-center p-1 rounded-md ${
                        res.status === "يتم"
                          ? "text-[#28a745] bg-[#d4edda]"
                          : res.status === "تم الإلغاء"
                          ? "text-[#dc3545] bg-[#f8d7da]"
                          : "text-[#ffc107] bg-[#fff3cd]"
                      }`}
                    >
                      {res.status}
                    </p>
                  </div>
                ))
              ) : (
                <p>لا توجد طلبات سابقة.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
