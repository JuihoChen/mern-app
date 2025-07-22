// client/src/components/ItemList.js
import React, { useState } from 'react';

function ItemList({ items, onDeleteItem, onUpdateItem }) { // Accept onUpdateItem prop
    const [editItemId, setEditItemId] = useState(null); // Stores the ID of the item being edited
    const [editedItemData, setEditedItemData] = useState({ name: '', description: '', quantity: '' });

    // Handles enabling edit mode for a specific item
    const handleEditClick = (item) => {
        setEditItemId(item._id);
        setEditedItemData({
            name: item.name,
            description: item.description,
            quantity: item.quantity
        });
    };

    // Handles changes in the input fields during editing
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItemData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handles saving the updated item
    const handleSave = () => {
        // Basic validation: ensure quantity is a number
        const updatedQuantity = parseInt(editedItemData.quantity);
        if (isNaN(updatedQuantity)) {
            alert("Quantity must be a number.");
            return;
        }

        onUpdateItem(editItemId, {
            name: editedItemData.name,
            description: editedItemData.description,
            quantity: updatedQuantity
        });
        setEditItemId(null); // Exit edit mode
        setEditedItemData({ name: '', description: '', quantity: '' }); // Clear temporary data
    };

    // Handles cancelling the edit operation
    const handleCancel = () => {
        setEditItemId(null); // Exit edit mode
        setEditedItemData({ name: '', description: '', quantity: '' }); // Clear temporary data
    };

    return (
        <div style={{ marginTop: '30px' }}>
            <h2>Existing Items</h2>
            {items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {items.map(item => (
                        <li
                            key={item._id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                padding: '10px',
                                border: '1px solid #ddd',
                                marginBottom: '8px',
                                borderRadius: '4px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            {editItemId === item._id ? (
                                // --- EDIT MODE ---
                                <div style={{ width: '100%' }}>
                                    <div style={{
                                        display: 'flex', // <<-- NEW: Use flexbox for horizontal layout
                                        flexDirection: 'row', // <<-- NEW: Arrange items in a row
                                        alignItems: 'center', // <<-- NEW: Vertically align items
                                        gap: '10px', // <<-- NEW: Add space between inputs
                                        marginBottom: '8px'
                                    }}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedItemData.name}
                                            onChange={handleChange}
                                            placeholder="Item Name"
                                            // Adjusted flex basis for distribution
                                            style={{ flex: 2, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        />
                                        <input
                                            type="text" // Changed to input as textarea in one line might not look good
                                            name="description"
                                            value={editedItemData.description}
                                            onChange={handleChange}
                                            placeholder="Description"
                                            // Adjusted flex basis for distribution
                                            style={{ flex: 3, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        />
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={editedItemData.quantity}
                                            onChange={handleChange}
                                            placeholder="Qty" // Shorter placeholder for better fit
                                            // Adjusted flex basis for distribution
                                            style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                        <button
                                            onClick={handleSave}
                                            style={{
                                                backgroundColor: 'green', color: 'white', border: 'none',
                                                padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                                            }}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            style={{
                                                backgroundColor: '#6c757d', color: 'white', border: 'none',
                                                padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // --- DISPLAY MODE ---
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <span>
                                        <strong>{item.name}</strong> - {item.description} (Qty: {item.quantity})
                                    </span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            style={{
                                                backgroundColor: '#007bff', color: 'white', border: 'none',
                                                padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8em'
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteItem(item._id)}
                                            style={{
                                                backgroundColor: 'red', color: 'white', border: 'none',
                                                padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8em'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ItemList;