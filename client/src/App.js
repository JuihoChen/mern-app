// client/src/App.js
import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import axios from 'axios';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';

function App() {
    const [items, setItems] = useState([]);

    const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // --- Add this console.log to see the resolved URL ---
    console.log('Frontend using BACKEND_URL:', BACKEND_URL);

    // --- Wrap fetchItems in useCallback to make it stable ---
    const fetchItems = useCallback(() => {
        axios.get(`${BACKEND_URL}/items/`)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the items!", error);
            });
    }, [BACKEND_URL]); // fetchItems depends on BACKEND_URL, so include it here

    // useEffect to fetch items when the component mounts
    // Now, fetchItems is stable, so including it in the dependency array is safe.
    useEffect(() => {
        fetchItems();
    }, [fetchItems]); // Include fetchItems in the dependency array

    // Function to handle adding a new item
    const handleAddItem = useCallback((newItem) => {
        axios.post(`${BACKEND_URL}/items/add`, newItem)
            .then(res => {
                console.log(res.data);
                fetchItems(); // Call fetchItems to refresh the list
            })
            .catch(error => console.error("Error adding item:", error));
    }, [BACKEND_URL, fetchItems]); // handleAddItem depends on BACKEND_URL and fetchItems

    // Function to handle deleting an item
    const handleDeleteItem = useCallback((id) => {
        axios.delete(`${BACKEND_URL}/items/${id}`)
            .then(res => {
                console.log(res.data);
                fetchItems(); // Call fetchItems to refresh the list
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    }, [BACKEND_URL, fetchItems]); // handleDeleteItem depends on BACKEND_URL and fetchItems

    // Function to handle updating an item
    const handleUpdateItem = useCallback((id, updatedItem) => {
        axios.post(`${BACKEND_URL}/items/update/${id}`, updatedItem)
            .then(res => {
                console.log(res.data);
                fetchItems(); // Call fetchItems to refresh the list
            })
            .catch(error => {
                console.error("Error updating item:", error);
            });
    }, [BACKEND_URL, fetchItems]); // handleUpdateItem depends on BACKEND_URL and fetchItems

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>MERN Stack App</h1>
            <AddItemForm onAddItem={handleAddItem} />
            <ItemList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
        </div>
    );
}

export default App;
