import React from "react";

const TextFields = ({
  name,
  label,
  value,
  type = "text",
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default TextFields;
