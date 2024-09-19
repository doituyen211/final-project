import React from "react";
import DropdownComponent from "./DropdownComponent";
import { useGetQuantity } from "../hooks";

const DisplayQuantity = () => {
  const { totalStudentsAllYears, totalGraduateStudentsAllYears, totalYears } =
    useGetQuantity();
  return (
    <div className="bg-white rounded shadow">
      <div className="d-flex gap-5 p-5">
        <DropdownComponent />
        <div>
          <div className="text-bold text-lg">Số học viên theo học</div>
          <div className="d-flex">
            <div>
              <div className="d-flex text-xl">
                {totalStudentsAllYears}
                <div className="ml-1 mt-3 text-sm">học viên</div>/
              </div>
            </div>
            <div className="mt-3 text-sm">{totalYears} năm</div>
          </div>
        </div>

        <div>
          <div className="text-bold text-lg">Số học viên tốt nghiệp</div>
          <div className="d-flex">
            <div>
              <div className="d-flex text-xl">
                {totalGraduateStudentsAllYears}
                <div className=" ml-1 mt-3 text-sm">học viên</div>/
              </div>
            </div>
            <div className="mt-3 text-sm">{totalYears} năm</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayQuantity;
