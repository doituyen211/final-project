import React from 'react';
import {Button} from 'react-bootstrap';

function TableComponents(props) {
    const {
        cols, titleTable, dataTable, classTable,
        formFieldsProp, actionView, actionEdit, useModal, actionDelete, openModal, currentPage
    } = props;


    return (
        <>
            <h2>{titleTable}</h2>
            <table className={classTable}>
                <thead>
                <tr>
                    {Array.isArray(cols) && cols.map((col, index) => (
                        <th key={index}>{col}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {dataTable.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{rowIndex + 10 * (currentPage - 1) + 1}</td>
                        {/*<td>{row.id}</td>*/}
                        {formFieldsProp.map((field, cellIndex) => (
                            <td key={cellIndex}>{row[field.name]}</td>
                        ))}
                        <td className="text-center">
                            <Button
                                variant="light"
                                className="me-2"
                                onClick={() => {
                                    if (!useModal) {
                                        console.log("Using actionView");
                                        actionView(row);
                                    } else {
                                        console.log("Using default view action");
                                        openModal('VIEW', true, row);
                                    }
                                }}
                            >
                                View
                            </Button>
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={() => {
                                    if (!useModal) {
                                        console.log("Using actionEdit");
                                        actionEdit(row);
                                    } else {
                                        console.log("Using default edit action");
                                        openModal('EDIT', true, row);
                                    }
                                }}
                            >
                                Edit
                            </Button>

                            <Button variant="danger" onClick={() => actionDelete(row)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    );
}

export default TableComponents;
