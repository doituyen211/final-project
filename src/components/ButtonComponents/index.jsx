// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({type, className, onClick, children}) => {
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
};

Button.defaultProps = {
    type: 'button',
    className: '',
    onClick: () => {
    }
};

export default Button;
