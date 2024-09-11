"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import the library
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the CSS for styling

interface Package {
  _id: string;
  name: string;
  duration: string;
  adSpots: number;
  adLength: number;
  targetTimeSlots: string;
  cost: number;
}

const PackageList = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPackageId, setCurrentPackageId] = useState<string | null>(null);

  const [newPackage, setNewPackage] = useState({
    name: '',
    duration: '',
    adSpots: 0,
    adLength: 0,
    targetTimeSlots: '',
    cost: 0,
  });

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('https://radio-fullstack.onrender.com/api/packages');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPackage({
      ...newPackage,
      [name]: name === 'adSpots' || name === 'adLength' || name === 'cost' ? Number(value) : value,
    });
  };

  // Handle package creation or update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && currentPackageId) {
        // Update an existing package
        await axios.put(`https://radio-fullstack.onrender.com/api/packages/${currentPackageId}`, newPackage);
        toast.success('Package updated successfully!');
      } else {
        // Create a new package
        await axios.post('https://radio-fullstack.onrender.com/api/packages', newPackage);
        toast.success('Package added successfully!');
      }
      setShowForm(false);
      setEditMode(false);
      setCurrentPackageId(null);
      fetchPackages();
    } catch (error) {
      console.error('Error submitting package:', error);
      toast.error('Failed to submit package');
    }
  };

  // Open form to edit a package
  const handleEdit = (pkg: Package) => {
    setNewPackage({
      name: pkg.name,
      duration: pkg.duration,
      adSpots: pkg.adSpots,
      adLength: pkg.adLength,
      targetTimeSlots: pkg.targetTimeSlots,
      cost: pkg.cost,
    });
    setCurrentPackageId(pkg._id);
    setEditMode(true);
    setShowForm(true);
  };

  // Delete a package with custom confirmation
  const handleDelete = async (id: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this package?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`https://radio-fullstack.onrender.com/api/packages/${id}`);
              toast.success('Package deleted successfully!');
              fetchPackages();
            } catch (error) {
              console.error('Error deleting package:', error);
              toast.error('Failed to delete package');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  // Fetch packages again after any change
  const fetchPackages = async () => {
    try {
      const response = await axios.get('https://radio-fullstack.onrender.com/api/packages');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">الباقات الحالية</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setNewPackage({ name: '', duration: '', adSpots: 0, adLength: 0, targetTimeSlots: '', cost: 0 });
            setShowForm(true);
            setEditMode(false);
          }}
        >
          إضافة باقة جديدة
        </button>
      </div>

      {/* Package list table */}
      <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-right">
            <th className="py-4 px-6 font-semibold">اسم الباقة</th>
            <th className="py-4 px-6 font-semibold">عدد الإشهارات</th>
            <th className="py-4 px-6 font-semibold">المدة</th>
            <th className="py-4 px-6 font-semibold">أوقات الذروة</th>
            <th className="py-4 px-6 font-semibold">التكلفة</th>
            <th className="py-4 px-6 font-semibold text-center">...</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={pkg._id} className={`text-right ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="px-6 py-4">{pkg.name}</td>
              <td className="px-6 py-4">{pkg.adSpots} إشهار</td>
              <td className="px-6 py-4">{pkg.duration}</td>
              <td className="px-6 py-4">{pkg.targetTimeSlots}</td>
              <td className="px-6 py-4">{pkg.cost} د.م</td>
              <td className="px-6 py-4 text-center">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(pkg)}>
                  تعديل
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleDelete(pkg._id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding or editing a package */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">{editMode ? 'تعديل الباقة' : 'إضافة باقة جديدة'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">اسم الباقة</label>
                <input
                  type="text"
                  name="name"
                  value={newPackage.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">عدد الإشهارات</label>
                <input
                  type="number"
                  name="adSpots"
                  value={newPackage.adSpots}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">المدة</label>
                <input
                  type="text"
                  name="duration"
                  value={newPackage.duration}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">أوقات الذروة</label>
                <input
                  type="text"
                  name="targetTimeSlots"
                  value={newPackage.targetTimeSlots}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">التكلفة</label>
                <input
                  type="number"
                  name="cost"
                  value={newPackage.cost}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">مدة الإعلان</label>
                <input
                  type="number"
                  name="adLength"
                  value={newPackage.adLength}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editMode ? 'تعديل' : 'إضافة'}
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowForm(false)}
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageList;
