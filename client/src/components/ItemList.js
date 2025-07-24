// client/src/components/ItemList.js
import React, { useState } from 'react';

function ItemList({ items, onDeleteItem, onUpdateItem }) {
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
            console.error("Quantity must be a number."); // Replaced alert()
            return;
        }
        if (!editedItemData.name.trim() || !editedItemData.description.trim()) {
            console.error("Item name and description cannot be empty."); // Added validation
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
        <div style={{ marginTop: '30px', border: '1px solid #e2e8f0', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#333' }}>Existing Items</h2>
            {items.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>No items found. Add some items above!</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {items.map(item => (
                        <li
                            key={item._id}
                            style={{
                                display: 'flex',
                                flexDirection: 'row', // Ensure row direction
                                justifyContent: 'space-between',
                                alignItems: 'center', // Vertically align items
                                padding: '16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.2s ease-in-out',
                                flexWrap: 'nowrap', // Prevent wrapping
                                overflowX: 'auto', // Allow horizontal scroll if content overflows
                                minWidth: '0' // Allow content to shrink
                            }}
                        >
                            {editItemId === item._id ? (
                                // --- EDIT MODE: Compact single line with inline styles ---
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexGrow: 1, flexWrap: 'nowrap', overflowX: 'auto', padding: '4px 0' }}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedItemData.name}
                                        onChange={handleChange}
                                        placeholder="Item Name"
                                        style={{ flexShrink: 0, width: '120px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        value={editedItemData.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                        style={{ flexShrink: 0, width: '180px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={editedItemData.quantity}
                                        onChange={handleChange}
                                        placeholder="Qty"
                                        style={{ flexShrink: 0, width: '60px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        min="1"
                                    />
                                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
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
                                // --- DISPLAY MODE: Compact single line with inline styles ---
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, flexWrap: 'nowrap', overflowX: 'auto', padding: '4px 0' }}>
                                    <span style={{ flexShrink: 0, marginRight: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 'calc(100% - 150px)' }}>
                                        <strong style={{ fontSize: '1.125rem', fontWeight: '500', color: '#1a202c' }}>{item.name}</strong> - <span style={{ color: '#4a5568', fontSize: '0.875rem' }}>{item.description} (Qty: {item.quantity})</span>
                                    </span>
                                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            style={{
                                                backgroundColor: '#007bff', // Original blue color
                                                color: 'white', border: 'none',
                                                padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8em'
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDeleteItem(item._id)}
                                            style={{
                                                backgroundColor: 'red', // Original red color
                                                color: 'white', border: 'none',
                                                padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8em'
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
