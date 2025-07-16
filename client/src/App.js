// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItemForm from './components/AddItemForm'; // Import the new component
import ItemList from './components/ItemList';       // Import the new component

function App() {
  const [items, setItems] = useState([]);
  // newItemName, newItemDescription, newItemQuantity are now managed inside AddItemForm

  // Function to fetch items from the backend
  const fetchItems = () => {
    axios.get('http://localhost:5000/items/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  };

  // useEffect to fetch items when the component mounts
  useEffect(() => {
    fetchItems();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle adding a new item (passed to AddItemForm)
  const handleAddItem = (newItem) => { // newItem is now passed from AddItemForm
    axios.post('http://localhost:5000/items/add', newItem)
      .then(res => {
        console.log(res.data); // 'Item added!' from backend goes here
        fetchItems(); // Refresh the list of items after adding
      })
      .catch(error => console.error("Error adding item:", error));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>MERN Stack App</h1>

      {/* Render the AddItemForm component */}
      <AddItemForm onAddItem={handleAddItem} />

      {/* Render the ItemList component */}
      <ItemList items={items} />
    </div>
  );
}

export default App;