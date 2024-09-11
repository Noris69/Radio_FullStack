"use client";
import React, { useState } from 'react';

const contacts = [
  { name: 'سعد الحنينة', email: 'kyledanford@mail.com' },
  { name: 'كريمة بانون', email: 'Trynisha.obey@mail.com' },
  { name: 'محمود بنيحي', email: 'Clintonmcclure@mail.com' },
  { name: 'محمد الكرامي', email: 'Tanner_stafford@mail.com' },
  { name: 'رشيدة القالي', email: 'burress.hannah@mail.com' },
  { name: 'محمد الراشد', email: 'schluessler006@mail.com' },
];

const NewMessageForm: React.FC = () => {
  const [showContactCard, setShowContactCard] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const toggleContactCard = () => {
    setShowContactCard(!showContactCard);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setEmails([...emails, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const addEmail = (email: string) => {
    if (!emails.includes(email)) {
      setEmails([...emails, email]);
    }
    setShowContactCard(false); // Close the contact card after adding the email
  };

  return (
    <div className={`relative ${showContactCard ? 'overflow-hidden' : ''}`}>
      <div className="flex flex-col w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">رسالة جديدة</h1>
          <div className="flex items-center space-x-2">
            <button className="text-slate-500">
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
            <button className="text-slate-500">
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-slate-600">إرسال إلى</label>
          <div className="flex items-center flex-wrap space-x-2">
            {emails.map((email, index) => (
              <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center space-x-2">
                <span>{email}</span>
                <button onClick={() => removeEmail(index)} className="text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
            ))}
            
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg" onClick={toggleContactCard}>أضف +</button>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-slate-600">الموضوع</label>
          <input
            type="text"
            className="px-4 py-2 border rounded-lg"
            placeholder="أدخل موضوع الرسالة"
          />
        </div>
        <div className="flex flex-col mb-4">
          <textarea
            className="w-full h-48 px-4 py-2 border rounded-lg"
            placeholder="اكتب رسالتك هنا..."
          ></textarea>
          <div className="flex items-center space-x-2 mt-2">
            <button className="p-2 text-slate-500 hover:text-blue-600">
              <strong>B</strong>
            </button>
            <button className="p-2 text-slate-500 hover:text-blue-600">
              <em>I</em>
            </button>
            <button className="p-2 text-slate-500 hover:text-blue-600">
              <u>U</u>
            </button>
            <button className="p-2 text-slate-500 hover:text-blue-600">
              1
            </button>
            <button className="p-2 text-slate-500 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-500 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 01-2.828 0L3 10.828m9-9.172a2 2 0 012.828 0l6.586 6.586a2 2 0 010 2.828L10.828 21a2 2 0 01-2.828 0L3 15.172M3 10.828L12.828 1m6.586 6.586L21 12.828"
                />
              </svg>
            </button>
            <button className="p-2 text-slate-500 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-4.576 4.576-3.576-3.576m0 0L2.336 16m9.664-4.664L22 8.336m0 0l-5.168-1.168m-5.168-1.168L22 8.336"
                />
              </svg>
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Send Message</button>
        </div>
      </div>
      {showContactCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">لائحة الزبناء</h2>
              <button onClick={toggleContactCard} className="text-gray-600">
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
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="فكرشلا وا مسارلأ ديربت نع بجاو"
            />
            <div>
              <h3 className="font-semibold mb-2">Recent contacts</h3>
              <ul>
                {contacts.slice(0, 3).map((contact, index) => (
                  <li key={index} className="flex items-center mb-2 cursor-pointer" onClick={() => addEmail(contact.email)}>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/445a0e6a5834516ee95245b8c7da31525f8dc3dc3e9a9b261500ef069c4e193b?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
                      alt=""
                      className="shrink-0 w-12 aspect-square mr-2"
                    />
                    <div className="flex-grow">
                      <p className="font-bold">{contact.name}</p>
                      <p className="text-gray-500">{contact.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <h3 className="font-semibold mt-4 mb-2">All contacts</h3>
              <ul>
                {contacts.map((contact, index) => (
                  <li key={index} className="flex items-center mb-2 cursor-pointer" onClick={() => addEmail(contact.email)}>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/445a0e6a5834516ee95245b8c7da31525f8dc3dc3e9a9b261500ef069c4e193b?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
                      alt=""
                      className="shrink-0 w-12 aspect-square mr-2"
                    />
                    <div className="flex-grow">
                      <p className="font-bold">{contact.name}</p>
                      <p className="text-gray-500">{contact.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={toggleContactCard}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMessageForm;
