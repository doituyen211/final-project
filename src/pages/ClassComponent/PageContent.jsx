import React, { useState } from "react";
import ModalComponent from "../../components/ModalComponent";
import PagingComponent from "../../components/PagingComponent";
import TableComponents from "../../components/TableComponent";
import ToolsComponent from "./ToolsComponent";
import NotificationComponent from "../../components/NotificationComponent";

const PageContent = ({
  headerContent,
  dataTable,
  getData,
  classTable,
  apiUpdate,
  apiCreate,
  apiDelete,
  apiView,
  formFieldsProp,
  cols,
  handleSave,
}) => {
  const [isEdit, setIsEdit] = useState(true);
  const [isCurrent, setIsCurrent] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalProps, setModalProps] = useState({
    show: modalShow,
    action: "",
    formFieldsProp: formFieldsProp,
    initialIsEdit: false,
    initialIdCurrent: null,
    apiUpdate: apiUpdate,
    apiCreate: apiCreate,
  });

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col">
              <div className="card card-primary">
                <div className="card-body">
                  <div className="mb-3 text-lg">{headerContent}</div>
                  <ToolsComponent
                    setModalShow={setModalShow}
                    setModalProps={setModalProps}
                    handleSave={handleSave}
                    formFieldsProp={formFieldsProp}
                    apiCreate={apiCreate}
                  />

                  <div className="row">
                    <div className="col-12">
                      <TableComponents
                        cols={cols}
                        dataTable={dataTable}
                        classTable={classTable}
                        apiDelete={apiDelete}
                        apiUpdate={apiUpdate}
                        apiView={apiView}
                        formFieldsProp={formFieldsProp}
                        getData={getData}
                      />
                    </div>
                  </div>

                  <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                      <PagingComponent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalComponent show={modalShow} getData={getData} {...modalProps} />
      <NotificationComponent />
    </>
  );
};

export default PageContent;
