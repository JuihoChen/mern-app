import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/items/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  const handleAddItem = () => {
    const newItem = {
      name: newItemName,
      description: newItemDescription,
      quantity: parseInt(newItemQuantity)
    };

    axios.post('http://localhost:5000/items/add', newItem)
      .then(res => {
        console.log(res.data);
        // Refresh the list of items
        axios.get('http://localhost:5000/items/')
          .then(response => setItems(response.data));
        // Clear form
        setNewItemName('');
        setNewItemDescription('');
        setNewItemQuantity('');
      })
      .catch(error => {
        console.error("Error adding item:", error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MERN Stack App</h1>
      <h2>Add New Item</h2>
      <div>
        <input
          type="text"
          placeholder="Item Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <h2>Existing Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item._id}>
              <strong>{item.name}</strong> - {item.description} (Qty: {item.quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
