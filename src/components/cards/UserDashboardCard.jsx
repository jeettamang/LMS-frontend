import React from "react";

const DashboardCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-4 flex items-center justify-between transition-transform hover:scale-[1.02] duration-200">
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-2xl font-black text-gray-800 mt-2">{value}</p>
      </div>

      {/* Dynamic Icon Container */}
      {icon && (
        <div
          className={`w-14 h-14 rounded-2xl ${bgColor || "bg-gray-50"} flex items-center justify-center shadow-inner`}
        >
          {React.cloneElement(icon, { size: 28 })}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
