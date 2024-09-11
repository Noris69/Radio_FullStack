import React from "react";

interface SidebarItemProps {
  icon: string;
  text: string;
  badge?: string;
  selected?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  badge,
  selected = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center px-6 py-3 mt-2 text-base tracking-wide cursor-pointer ${
        selected ? "bg-blue-100 text-blue-600 font-bold" : "text-slate-500"
      } max-md:px-5 transition-all`}
    >
      <div className="flex gap-4 justify-between w-full">
        <div className="flex gap-4">
          <img
            loading="lazy"
            src={icon}
            alt={text}
            className="shrink-0 self-start aspect-square w-[22px]"
          />
          <div>{text}</div>
        </div>
        {badge && (
          <div className="p-2 text-xs leading-5 text-blue-600 bg-blue-50 rounded">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarItem;
