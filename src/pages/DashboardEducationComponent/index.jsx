import React from "react";
import GraduateClassesPerYearChart from "./components/GraduateClassesPerYearChart";
import { ReserveStudentPerYearChart } from "./components/ReserveStudentPerYearChart";

const DashboardEducationComponent = () => {
  return (
    <div className="p-3 d-flex gap-3">
      <GraduateClassesPerYearChart />
      <ReserveStudentPerYearChart />
    </div>
  );
};

export default DashboardEducationComponent;
