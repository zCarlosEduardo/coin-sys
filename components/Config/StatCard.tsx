import React from "react";

type StatCardProps = {
  label: string;
  value: number | string;
  color: string;
  sublabel?: string;
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  color,
  sublabel,
}) => (
  <div
    className={`flex justify-between items-center p-3 ${color} rounded-lg shadow-md`}
  >
    <span className="text-sm text-gray-700">{label}</span>
    <div className="text-right">
      <span
        className={`text-lg font-bold`}
      >
        {value}
      </span>
      {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
    </div>
  </div>
);