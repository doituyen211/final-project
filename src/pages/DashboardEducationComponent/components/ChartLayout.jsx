import React from "react";

const ChartLayout = ({ children }) => {
  return (
    <div className="position-relative w-50 h-50 bg-white p-5 rounded-lg shadow">
      {children}
    </div>
  );
};

export default ChartLayout;
