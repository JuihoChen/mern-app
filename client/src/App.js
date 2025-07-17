// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItemForm from './components/AddItemForm'; // Import the new component
import ItemList from './components/ItemList';       // Import the new component

function App() {
    const [items, setItems] = useState([]);
    // newItemName, newItemDescription, newItemQuantity are now managed inside AddItemForm

    // --- Define your backend URL here ---
    // Use your laptop's IP if accessing from another device, or 'localhost' if only on this machine.
    // For development, consider configuring a proxy in client/package.json.
    const BACKEND_URL = 'http://localhost:5000'; // <<< Make sure this is correct

    // Function to fetch items from the backend
    const fetchItems = () => {
        axios.get(`${BACKEND_URL}/items/`) // Use BACKEND_URL
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
        axios.post(`${BACKEND_URL}/items/add`, newItem) // Use BACKEND_URL
            .then(res => {
                console.log(res.data); // 'Item added!' from backend goes here
                fetchItems(); // Refresh the list of items after adding
            })
            .catch(error => console.error("Error adding item:", error));
    };

    // --- NEW: Function to handle deleting an item ---
    const handleDeleteItem = (id) => {
        axios.delete(`${BACKEND_URL}/items/${id}`) // Use BACKEND_URL
            .then(res => {
                console.log(res.data); // 'Item deleted.' from backend goes here
                fetchItems(); // Refresh the list of items after deleting
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>MERN Stack App</h1>

            {/* Render the AddItemForm component */}
            <AddItemForm onAddItem={handleAddItem} />

            {/* Render the ItemList component - NOW PASSING handleDeleteItem and BACKEND_URL */}
            <ItemList items={items} onDeleteItem={handleDeleteItem} backendUrl={BACKEND_URL} />
        </div>
    );
}

export default App;