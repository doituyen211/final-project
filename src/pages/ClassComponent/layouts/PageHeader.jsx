const PageHeader = ({ namePage }) => {
  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2 d-flex align-items-center">
          <div className="col-sm-6">
            <h1>{namePage}</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">{namePage}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
