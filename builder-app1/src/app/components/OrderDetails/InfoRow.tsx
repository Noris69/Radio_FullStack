// components/InfoRow.tsx
import React from "react";

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="font-semibold text-slate-900">{label}</div>
      <div className="text-base leading-6 text-slate-400">{value}</div>
    </div>
  );
};

export default InfoRow;
