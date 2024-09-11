import React, { useEffect, useState } from 'react';

interface Slot {
  _id: string;
  startTime: Date;
  endTime: Date;
  cost: string;
  date: Date;
}

interface TimeSlotProps {
  duration: string;
  time: string;
  price: string;
  isSelected?: boolean;
  onSelect: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ duration, time, price, isSelected = false, onSelect }) => {
  const containerClasses = isSelected
    ? "flex flex-col justify-center p-4 bg-purple-50 rounded-lg border mb-3 border-purple-300 border-solid max-md:max-w-full cursor-pointer"
    : "flex flex-col justify-center p-4 bg-white rounded-lg border mb-3 border-gray-300 border-solid max-md:max-w-full cursor-pointer";

  const checkboxClasses = isSelected
    ? "shrink-0 self-start w-4 h-4 border border-violet-500 border-solid aspect-square bg-violet-500 rounded-lg"
    : "shrink-0 self-start w-4 h-4 bg-white rounded-lg border border-gray-300 border-solid";

  const priceClasses = isSelected
    ? "text-purple-900 font-bold"
    : "text-gray-500 font-medium";

  return (
    <div className={containerClasses} onClick={onSelect}>
      <div className="flex gap-4 justify-between max-md:flex-wrap">
        <div className="flex flex-col flex-1 max-md:max-w-full">
          <div className={`font-medium ${isSelected ? 'text-violet-900' : 'text-violet-900'} max-md:max-w-full`}>
            {duration}
          </div>
          <div className={`${isSelected ? 'text-violet-500' : 'text-slate-600'} max-md:max-w-full`}>
            {time}
          </div>
        </div>
        <div className={priceClasses}>
          {price} درهم مغربي
        </div>
        {isSelected ? (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cfc2931fa68c5356435f155a8728dafd8b3ef72bcd78f6cefa58cd4647b7aab?apiKey=85058072149448d6b350b930168b1cb5&&apiKey=85058072149448d6b350b930168b1cb5"
            alt=""
            className={checkboxClasses}
          />
        ) : (
          <div className={checkboxClasses} />
        )}
      </div>
    </div>
  );
};

interface TimeSlotListProps {
  onSelectionChange: (slot: Slot, isSelected: boolean) => void;
  selectedDate: Date | null;
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({ onSelectionChange, selectedDate }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch('https://radio-fullstack.onrender.com/api/slots');
        const data: Slot[] = await response.json();

        // Convert the startTime, endTime, and date from strings to Date objects
        const formattedData = data.map(slot => ({
          ...slot,
          startTime: new Date(slot.startTime),
          endTime: new Date(slot.endTime),
          date: new Date(slot.date),
        }));
        console.log("test", formattedData)

        setSlots(formattedData);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots();
  }, []);

  const filteredSlots = slots.filter(slot => {
    return selectedDate && slot.date.toDateString() === selectedDate.toDateString();
  });

  const calculateDuration = (startTime: Date, endTime: Date) => {
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationMinutes = Math.floor(durationMs / 60000);
    return `${durationMinutes} minutes`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const toggleSelect = (slot: Slot) => {
    const isSelected = selectedSlots.includes(slot._id);
    if (isSelected) {
      setSelectedSlots(prev => prev.filter(i => i !== slot._id));
    } else {
      setSelectedSlots(prev => [...prev, slot._id]);
    }
    onSelectionChange(slot, !isSelected);
  };

  return (
    <div>
      {filteredSlots.map((slot) => (
        <TimeSlot
          key={slot._id}
          duration={calculateDuration(slot.startTime, slot.endTime)}
          time={`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}
          price={slot.cost}
          isSelected={selectedSlots.includes(slot._id)}
          onSelect={() => toggleSelect(slot)}
        />
      ))}
    </div>
  );
};

export default TimeSlotList;
