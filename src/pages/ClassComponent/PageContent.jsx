import React, { useEffect, useState } from "react";
import ButtonAddComponent from "./ButtonAddComponent";
import TableComponents from "../../components/TableComponent";
import PagingComponent from "../../components/PagingComponent";
import ModalAdd from "./ModalAdd";
import SearchComponent from "./SearchComponent";

const PageContent = ({ headerContent, cols, dataTable }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col">
              <div className="card card-primary">
                <div className="card-body">
                  <div className="mb-3 text-lg">{headerContent}</div>
                  <div className="d-flex align-items-center justify-content-between">
                    <SearchComponent />
                    <ButtonAddComponent setShowAddModal={setShowAddModal} />
                  </div>

                  <TableComponents
                    cols={cols}
                    dataTable={dataTable}
                    classTable={"table table-bordered table-hover"}
                  />
                  <div className="row justify-content-center mt-3">
                    <PagingComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalAdd showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
    </>
  );
};

export default PageContent;
