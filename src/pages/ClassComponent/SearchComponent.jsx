import React from "react";

const SearchComponent = () => {
  return (
    <div class="input-group input-group-sm mb-3 w-25">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">
          Search
        </span>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
      />
    </div>
  );
};

export default SearchComponent;
