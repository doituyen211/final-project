// src/components/InputComponents.js
import React from 'react';
import PropTypes from 'prop-types';

const InputComponents = ({ label, onChange, id, ...inputInfo }) => {
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <input id={id} onChange={onChange} className="form-control" {...inputInfo} />
        </>
    );
};

InputComponents.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string
};

InputComponents.defaultProps = {
    type: 'text',
    placeholder: '',
    label: '',
    id: ''
};

export default InputComponents;
