
const QualificationTittleComponent = () => {
  return (
    <>
      <div className="content-header">
        <div className="container-fluid">
        <div className="row m-1 mb-2 d-flex justify-content-betwen">
            <div className="col-10 m-0 p-0 d-flex justify-content-betwen">
              <h1 className="m-0 col-7">Danh sách bằng cấp</h1>
              <div class="input-group col-5">
                <select class="form-control col-4">
                  <option>Còn hạn</option>
                  <option>Hết hạn</option>
                </select>
                <input type="text" class="form-control" placeholder="Tìm kiếm ..."/>
                <div class="input-group-append">
                  <button class="btn btn-secondary">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-2 d-flex justify-content-end m-0 p-0">
              <button className="btn btn-success mr-2">
                <i className="fas fa-file-excel"></i>
              </button>
              <button className="btn btn-warning">
                <i className="fas fa-file-export"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QualificationTittleComponent;