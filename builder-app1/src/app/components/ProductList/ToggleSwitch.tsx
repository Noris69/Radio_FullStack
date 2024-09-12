import React from 'react';
interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`relative inline-block w-12 h-6 transition duration-200 ease-in ${
        isOn ? 'bg-blue-600' : 'bg-gray-200'
      } rounded-full cursor-pointer`}
    >
      <div
        className={`absolute left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in ${
          isOn ? 'translate-x-full' : ''
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;
