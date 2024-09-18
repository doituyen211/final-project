import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function DropDownComponent(props) {
    const { title, label, mode, data, onSelect, defaultValue, error } = props;
    const [selectedItem, setSelectedItem] = useState(null);
    const isDisabled = mode === 'view';

    useEffect(() => {
        if (defaultValue) {
            const defaultItem = data.find(item => item.label === defaultValue);
            setSelectedItem(defaultItem || null);
        }
    }, [defaultValue, data]);

    const handleSelect = (item) => {
        setSelectedItem(item);
        console.log("Selected item: ", item);
        if (onSelect) {
            onSelect(item);
        }
    };

    const menuStyle = {
        maxHeight: '200px',
        overflowY: 'auto',
    };

    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <Dropdown>
                <Dropdown.Toggle
                    variant="outline-dark"
                    id="dropdown-basic"
                    disabled={isDisabled}
                >
                    {selectedItem ? selectedItem.label : title}
                </Dropdown.Toggle>

                <Dropdown.Menu style={menuStyle}>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <Dropdown.Item
                                key={`${item.label}-${index}`}
                                onClick={() => handleSelect(item)}
                                active={selectedItem && selectedItem.label === item.label}
                            >
                                {item.label}
                            </Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item disabled>No items available</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            {/* Hiển thị lỗi */}
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
}

export default DropDownComponent;
