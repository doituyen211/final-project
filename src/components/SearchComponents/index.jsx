import React, { useState } from "react";

const SearchComponents = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchItem);
  };

  return (
    <div className="input-group w-50" style={{ marginTop: 8, marginBottom: 8 }}>
      <input
        className="form-control"
        placeholder="Search by mã môn học..."
        value={searchItem}
        onChange={handleInputChange}
        style={{ borderColor: "#ddd" }}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleSearch}
          style={{ borderColor: "#ddd" }}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchComponents;
