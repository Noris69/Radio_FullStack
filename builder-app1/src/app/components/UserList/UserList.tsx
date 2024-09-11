"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useRouter } from 'next/navigation'; // Import for routing

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  created_at: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const router = useRouter(); // Use router to redirect to profile page

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    phone: '',
    role: 'annonceur',
  });

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://radio-fullstack.onrender.com/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  // Handle user creation or update form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && currentUserId) {
        // Update an existing user
        await axios.put(`https://radio-fullstack.onrender.com/api/users/${currentUserId}`, newUser);
        toast.success('User updated successfully!');
      } else {
        // Create a new user
        await axios.post('https://radio-fullstack.onrender.com/api/users', newUser);
        toast.success('User added successfully!');
      }
      setShowForm(false);
      setEditMode(false);
      setCurrentUserId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error submitting user:', error);
      toast.error('Failed to submit user');
    }
  };

  // Open form to edit a user
  const handleEdit = (user: User) => {
    setNewUser({
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    setCurrentUserId(user._id);
    setEditMode(true);
    setShowForm(true);
  };

  // Delete a user with custom confirmation
  const handleDelete = async (id: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`https://radio-fullstack.onrender.com/api/users/${id}`);
              toast.success('User deleted successfully!');
              fetchUsers();
            } catch (error) {
              console.error('Error deleting user:', error);
              toast.error('Failed to delete user');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  // Redirect to profile page with userId
  const handleUserClick = (userId: string) => {
    router.push(`/Profile?userId=${userId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">المستخدمين الحاليين</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setNewUser({ username: '', email: '', phone: '', role: 'annonceur' });
            setShowForm(true);
            setEditMode(false);
          }}
        >
          إضافة مستخدم جديد
        </button>
      </div>

      {/* User list table */}
      <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="text-right">
            <th className="py-4 px-6 font-semibold">اسم المستخدم</th>
            <th className="py-4 px-6 font-semibold">البريد الإلكتروني</th>
            <th className="py-4 px-6 font-semibold">رقم الهاتف</th>
            <th className="py-4 px-6 font-semibold">الدور</th>
            <th className="py-4 px-6 font-semibold">تاريخ الإنشاء</th>
            <th className="py-4 px-6 font-semibold text-center">...</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr 
              key={user._id} 
              className={`text-right ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} cursor-pointer`}
              onClick={() => handleUserClick(user._id)}  // Navigate to profile on click
            >
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding or editing a user */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">{editMode ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">اسم المستخدم</label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">رقم الهاتف</label>
                <input
                  type="text"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">الدور</label>
                <select name="role" value={newUser.role} onChange={handleChange} className="border p-2 w-full rounded">
                  <option value="admin">Admin</option>
                  <option value="annonceur">Annonceur</option>
                </select>
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

export default UserList;
