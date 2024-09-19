import React, { useState, useEffect } from 'react';
import AllowanceFormComponents from './AllowanceFormComponents';
import AllowanceListComponents from './AllowanceListComponents';
import AllowanceEditComponents from './AllowanceEditComponents';

function AllowanceComponents() {
    const [data, setData] = useState([]);
    const [formState, setFormState] = useState({
        idCV: '',
        loaiPC: '',
        luongPC: '',
        trangThai: false,
        create_at: '',
        update_at: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetch('https://66ad1d32b18f3614e3b4736d.mockapi.io/allowances')
            .then(response => response.json())
            .then(fetchedData => {
                if (Array.isArray(fetchedData)) {
                    setData(fetchedData);
                } else {
                    console.error('Fetched data is not an array:', fetchedData);
                    setData([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setData([]);
            });
    }, []);

    const handleEdit = (item) => {
        if (item) {
            setSelectedItem(item);
            setShowModal(true);
        }
    };

    const handleSave = (updatedItem) => {
        const updatedData = data.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        setData(updatedData);
        setShowModal(false);
    };

    const handleDelete = (item) => {
        fetch(`https://66ad1d32b18f3614e3b4736d.mockapi.io/allowances/${item.id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    const updatedData = data.filter((i) => i.id !== item.id);
                    setData(updatedData);
                } else {
                    console.error('Error deleting item:', response.statusText);
                }
            })
            .catch((error) => console.error('Error deleting item:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nextID = data.length > 0? Math.max(...data.map((item) => item.id)) + 1 : 1;

        const newItem = {
            id: nextID,
            idCV: formState.idCV,
            loaiPC: formState.loaiPC,
            luongPC: formState.luongPC,
            trangThai: formState.trangThai,
            create_at: new Date().toLocaleDateString(),
            update_at: new Date().toLocaleDateString(),
        };

        const newData = [...data, newItem];
        setData(newData);
        setFormState({
            idCV: '',
            loaiPC: '',
            luongPC: '',
            trangThai: false,
            create_at: '',
            update_at: '',
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AllowanceFormComponents
                        formState={formState}
                        setFormState={setFormState}
                        handleSubmit={handleSubmit}
                    />
                </div>
                <div className="col-md-9">
                    <AllowanceListComponents
                        data={data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            </div>
            <AllowanceEditComponents
                show={showModal}
                handleClose={() => setShowModal(false)}
                item={selectedItem}
                handleSave={handleSave}
            />
        </div>
    );
}

export default AllowanceComponents;
