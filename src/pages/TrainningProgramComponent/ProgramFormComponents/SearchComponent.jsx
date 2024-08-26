import React from 'react';
import { Button } from 'react-bootstrap';

const SearchComponent = ({ searchItem, onChange, handleSearch }) => {
    return (
        <>
            <div
                className="d-flex w-50 align-items-center justify-content-end gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search input"
                    value={searchItem}
                    onChange={(e) => onChange(e.target.value)}
                />
                <Button variant="light" size="" onClick={() => handleSearch(searchItem)}>
                    <i className="bi bi-search"></i>
                </Button>
            </div>
        </>
    );
};

export default SearchComponent;