import React, { useState, useEffect } from 'react';
import AllowanceTableComponents from "../AllowanceTableComponents";

function AllowanceListComponents() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Fetch data from API or local state
    useEffect(() => {
        //
        const fetchedData = [
            // ...
        ];
        setData(fetchedData);
    }, []);

    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleDelete = (item) => {
        fetch(`https://66ad1d32b18f3614e3b4736d.mockapi.io/${item.id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    // If the deletion is successful, update the local state
                    const updatedData = data.filter((i) => i.id !== item.id);
                    setData(updatedData);
                } else {
                    // If there's an error, handle it appropriately
                    console.error('Error deleting item:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
            });
    };

    const handleSave = (updatedItem) => {
        fetch(`https://66ad1d32b18f3614e3b4736d.mockapi.io/${updatedItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        })
            .then((response) => {
                if (response.ok) {
                    // If the update is successful, update the local state
                    const updatedData = data.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                    );
                    setData(updatedData);
                    setShowModal(false);
                } else {
                    // If there's an error, handle it appropriately
                    console.error('Error updating item:', response.statusText);
                }
            })
            .catch((error) => {
                console.error('Error updating item:', error);
            });
    };

    return (
        <div>
            <AllowanceTableComponents data={data} onEdit={handleEdit} onDelete={handleDelete} />
            {/* Assuming AllowanceListComponents is a component that should be imported and used here */}
            <AllowanceListComponents
                show={showModal}
                onHide={() => setShowModal(false)}
                item={selectedItem}
                onSave={handleSave}
            />
        </div>
    );
}

export default AllowanceListComponents;
