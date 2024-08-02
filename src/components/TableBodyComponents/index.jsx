// src/components/TableBody.js
import React from 'react';
import PropTypes from 'prop-types';

const TableBodyComponents = ({rows}) => {
    return (
        <>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.data.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                    <td>
                        {row.actions.map((action, actionIndex) => (
                            <a href={action.href} className={`btn ${action.className}`} key={actionIndex}>
                                <i className={`fas ${action.icon}`}></i>
                            </a>
                        ))}
                    </td>
                </tr>
            ))}
        </>
    );
};

TableBodyComponents.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.string).isRequired,
            actions: PropTypes.arrayOf(
                PropTypes.shape({
                    href: PropTypes.string.isRequired,
                    className: PropTypes.string.isRequired,
                    icon: PropTypes.string.isRequired
                })
            ).isRequired
        })
    ).isRequired
};

export default TableBodyComponents;
