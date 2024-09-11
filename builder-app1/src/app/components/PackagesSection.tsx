import React, { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import the useRouter hook

const PackagesSection: React.FC = () => {
  const [packagesData, setPackagesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Use router for navigation

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("https://radio-fullstack.onrender.com/api/packages"); // Update this URL if necessary
        setPackagesData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleSelectPackage = (packageData: any) => {
    // Store the selected package in localStorage or sessionStorage
    localStorage.setItem("selectedPackage", JSON.stringify(packageData));
    localStorage.setItem("orderType", "package"); // Store the order type as 'package'

    // Navigate to the /Order page
    router.push("/Order");
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  return (
    <section className="flex flex-col items-center self-center px-5 mt-20 mb-16 w-full max-w-[1095px] max-md:my-10 max-md:max-w-full">
      <h2 className="text-5xl font-bold text-center capitalize text-indigo-950 max-md:max-w-full max-md:text-4xl">
        باقات الإعلانات الإذاعية
      </h2>
      <p className="mt-8 text-lg font-semibold text-center text-gray-500 max-md:max-w-full">
        نقدم باقات إعلانات إذاعية بأسعار تنافسية ومواقع متميزة لضمان وصول
        رسالتكم إلى الجمهور المستهدف
        <br />
        بكفاءة. استمتعوا بتكاليف أقل وتغطية أوسع مع باقاتنا المصممة لتحقيق أفضل
        النتائج.
      </p>
      <div className="mt-20 max-md:mt-10">
        {/* Conteneur avec arrière-plan partagé pour les cartes */}
        <div
          className="flex gap-5 justify-center bg-[rgba(37,99,235,0.09)] relative max-md:flex-col p-10 rounded-lg"
          style={{ backgroundColor: "" }}
        >
          {packagesData.map((packageData, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between max-md:ml-0 max-md:w-full ${
                index === 2 // Check if it's the third card (index 2)
                  ? "relative z-10 transform scale-105 shadow-lg bg-blue-600 text-white"
                  : ""
              }`}
              style={{
                color: index === 2 ? "#FFFFFF" : "#000000", // Set color based on the index
                borderRadius: "20px",
                marginLeft: "10px",
                width: "100%", // Ensures all cards have the same width
                height: "auto", // Ensures all cards have the same height
              }}
            >
              <PackageCard
                title={packageData.name}
                price={`د.م.${packageData.cost}`}
                description={packageData.contentType}
                features={[
                  { text: `${packageData.adSpots} إعلانات إذاعية` },
                  { text: `${packageData.duration}` },
                  { text: `المدة القصوى لإعلان ${packageData.adLength} ثانية` },
                ]}
                isHighlighted={index === 2} // Highlight the third card
                onSelect={() => handleSelectPackage(packageData)} // Pass the onSelect function
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
