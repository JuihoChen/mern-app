// client/src/components/AddItemForm.js
import React, { useState } from 'react';

function AddItemForm({ onAddItem }) { // onAddItem will be a prop (a function from App.js)
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create the new item object
    const newItem = {
      name: newItemName,
      description: newItemDescription,
      quantity: parseInt(newItemQuantity)
    };

    // Call the function passed from the parent (App.js)
    onAddItem(newItem);

    // Clear form fields after submission
    setNewItemName('');
    setNewItemDescription('');
    setNewItemQuantity('');
  };

  return (
    <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}> {/* Use a form element */}
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;