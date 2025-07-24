// client/src/components/AddItemForm.js
import React, { useState } from 'react';

function AddItemForm({ onAddItem }) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation
    if (!newItemName.trim() || !newItemDescription.trim() || isNaN(parseInt(newItemQuantity))) {
        console.error("Please fill in all fields correctly (Quantity must be a number).");
        // In a real app, you might display a user-friendly error message here
        return;
    }

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
    // Removed mx-auto from here as its parent div in App.js now handles centering with max-w-2xl and mx-auto
    <div className="mb-8 p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
      {/* Increased font size for the heading */}
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Add New Item</h2>
      {/* Changed form to a flex container to align inputs and button horizontally */}
      {/* Changed sm:items-end to sm:items-center to align items vertically in the middle */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          // Increased font size for input fields and made them flexible
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm text-lg min-w-[100px]"
          required
        />
        <textarea
          placeholder="Description"
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
          // Adjusted height back to h-12 and kept resize-y for scrollbar
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm h-12 text-lg min-w-[120px] resize-y"
          required
        />
        <input
          type="number"
          placeholder="Qty"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          // Increased font size for quantity input and fixed width
          className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm text-lg"
          required
          min="1" // Ensure quantity is at least 1
        />
        <button
          type="submit"
          // Explicitly setting background color with inline style for reliability
          style={{ backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          // Adjusted padding and font size to match Edit/Delete buttons
          className="py-2 px-4 rounded-lg shadow-md text-sm flex-shrink-0
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;
