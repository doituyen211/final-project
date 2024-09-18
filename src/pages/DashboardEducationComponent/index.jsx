import DisplayQuantity from "./components/DisplayQuantity";
import { GraduateStudentsPerYear } from "./components/GraduateStudentsPerYear";
import ReserveStudentsPerYear from "./components/ReserveStudentsPerYear";
import TotalStudentPerYear from "./components/TotalStudentPerYear";

const DashboardEducationComponent = () => {
  return (
    <div className="p-3">
      <DisplayQuantity />
      <div className="d-flex gap-3 mt-3 mb-3">
        <TotalStudentPerYear />
        <GraduateStudentsPerYear />
      </div>
      <div>
        <ReserveStudentsPerYear />
      </div>
    </div>
  );
};

export default DashboardEducationComponent;
