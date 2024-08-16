import React from 'react';
import AllowanceFormComponents from './AllowanceFormComponents';
import AllowanceListComponents from './AllowanceListComponents';
import AllowanceEditComponents from './AllowanceEditComponents';

function AllowanceComponents() {
    return (
        <div className="container">
            <h1>Quản lý phụ cấp</h1>
            <AllowanceFormComponents />
            <AllowanceListComponents />
            <AllowanceEditComponents />
        </div>
    );
}

export default AllowanceComponents;
