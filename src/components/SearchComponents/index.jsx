import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const SearchComponents = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="input-group search-container" style={{ width: "50%" }}>
      <input
        type="text"
        className="form-control search-input"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-button"
        onChange={handleSearchChange}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary search-button"
          type="button"
          id="search-button"
          style={{ borderColor: "#ddd" }}
          onClick={handleSearch}
        >
          <i className="bi bi-search search-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchComponents;
