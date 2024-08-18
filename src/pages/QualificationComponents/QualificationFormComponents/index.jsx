import React, { useRef, useState } from 'react';

const QualificationFormComponent = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [fileName, setFileName] = useState('Ảnh bằng cấp');
  const imagePreviewRef = useRef(null);

  function previewImage(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSrc(e.target.result);
        if (imagePreviewRef.current) {
          imagePreviewRef.current.style.display = 'block';
        }
      };
      reader.readAsDataURL(input.files[0]);
      setFileName(input.files[0].name);
    } else {
      setImageSrc('');
      setFileName('Ảnh bằng cấp');
      if (imagePreviewRef.current) {
        imagePreviewRef.current.style.display = 'none';
      }
    }
  }

  return (
    <form className="col-4">
      <section className="container">
        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="departmentName">Tên bằng cấp</label>
            <input type="text" className="form-control" id="departmentName" placeholder="Tên bằng cấp" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="form-group">
              <label>Nhân viên</label>
              <select className="form-control">
                <option>Nguyễn Văn A</option>
                <option>Lê Văn B</option>
                <option>Hoàng Văn C</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="time">Thời hạn</label>
            <input type="date" className="form-control" id="time" />
          </div>
        </div>

        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="image">Hình ảnh</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="image"
                  onChange={previewImage}
                />
                <label className="custom-file-label" htmlFor="image">
                  {fileName}
                </label>
              </div>
              <img
                ref={imagePreviewRef}
                id="image-preview"
                src={imageSrc}
                alt="Xem trước hình ảnh"
                className="img-thumbnail mt-2"
                style={{ maxWidth: "100%", display: imageSrc ? 'block' : 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              Thêm mới
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default QualificationFormComponent;
