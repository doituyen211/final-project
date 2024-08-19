import TableHasAction from "../components/TableHasAction";
import ToolsComponent from "../components/ToolsComponent";

const PageContent = ({ headerContent }) => {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col">
            <div className="card card-primary">
              <div className="card-body">
                <div className="mb-3 text-lg">{headerContent}</div>
                <ToolsComponent />
                <div className="row">
                  <div className="col-12">
                    <TableHasAction />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageContent;
