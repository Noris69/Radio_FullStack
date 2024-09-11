import React from "react";

const SignupForm: React.FC = () => {
  return (
    <form className="w-full space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">تسجيل الآن</h2>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">الاسم الكامل</label>
        <input type="text" placeholder="الاسم الكامل" className="mt-1 px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">إسم الشركة</label>
        <input type="text" placeholder="إسم الشركة" className="mt-1 px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
        <input type="email" placeholder="البريد الإلكتروني" className="mt-1 px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">كلمة السر</label>
        <input type="password" placeholder="كلمة السر" className="mt-1 px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">أعد كلمة السر</label>
        <input type="password" placeholder="أعد كلمة السر" className="mt-1 px-3 py-2 border border-gray-300 rounded-md" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="terms" name="terms" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          إنشاء حساب يعني أنك توافق على الشروط والأحكام و سياسة الخصوصية الخاصة بنا
        </label>
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">تسجيل الآن</button>
    </form>
  );
};

export default SignupForm;
