// client/src/components/ItemList.js
import React from 'react';
// If you want a specific X-circle icon, you might import an icon library here.
// For example, if using Font Awesome: import { FaTimesCircle } from 'react-icons/fa';

function ItemList({ items, onDeleteItem }) { // Accept onDeleteItem prop
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
                                display: 'flex', // Use flexbox to align content and button
                                justifyContent: 'space-between', // Push button to the right
                                alignItems: 'center', // Vertically align items
                                padding: '10px',
                                border: '1px solid #ddd',
                                marginBottom: '5px',
                                borderRadius: '4px',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
              <span>
                <strong>{item.name}</strong> - {item.description} (Qty: {item.quantity})
              </span>
                            {/* --- DELETE BUTTON --- */}
                            <button
                                onClick={() => onDeleteItem(item._id)} // Call onDeleteItem from props
                                style={{
                                    marginLeft: '15px', // Space between text and button
                                    backgroundColor: 'red',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '0.8em'
                                }}
                            >
                                Delete
                                {/* If you wanted an 'X' or 'x-circle' text: */}
                                {/* X */}
                                {/* If using Font Awesome icon: */}
                                {/* <FaTimesCircle /> */}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ItemList;