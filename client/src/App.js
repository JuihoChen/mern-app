// client/src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AddItemForm from './components/AddItemForm'; // Import the actual AddItemForm
import ItemList from './components/ItemList';     // Import the actual ItemList
import './style.css'; // Import the new CSS file

function App() {
    const [items, setItems] = useState([]);

    const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    console.log('Frontend using BACKEND_URL:', BACKEND_URL);

    const fetchItems = useCallback(() => {
        axios.get(`${BACKEND_URL}/items/`)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the items!", error);
            });
    }, [BACKEND_URL]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleAddItem = useCallback((newItem) => {
        axios.post(`${BACKEND_URL}/items/add`, newItem)
            .then(res => {
                console.log(res.data);
                fetchItems();
            })
            .catch(error => console.error("Error adding item:", error));
    }, [BACKEND_URL, fetchItems]);

    const handleDeleteItem = useCallback((id) => {
        axios.delete(`${BACKEND_URL}/items/${id}`)
            .then(res => {
                console.log(res.data);
                fetchItems();
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    }, [BACKEND_URL, fetchItems]);

    const handleUpdateItem = useCallback((id, updatedItem) => {
        axios.post(`${BACKEND_URL}/items/update/${id}`, updatedItem)
            .then(res => {
                console.log(res.data);
                fetchItems();
            })
            .catch(error => {
                console.error("Error updating item:", error);
            });
    }, [BACKEND_URL, fetchItems]);

    return (
        // Main container with a subtle gradient background and padding
        <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center font-inter">
            {/* Main Content Wrapper: This div will contain all main content and be centered */}
            {/* Using inline style for robust centering with a max-width */}
            <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto' }}>
                {/* Main Heading with Gradient and Shadow */}
                <h1 className="text-6xl font-extrabold mb-10 text-center
                               bg-gradient-to-r from-blue-600 to-purple-600 text-gradient-shadow">
                    MERN Stack App
                </h1>

                {/* Pulsing Circle Demo */}
                <div className="w-24 h-24 bg-violet-500 rounded-full mb-10 pulsing-circle flex items-center justify-center text-white text-sm font-semibold shadow-lg mx-auto">
                    Awesome!
                </div>

                {/* Container for AddItemForm with hover effect.
                    Increased max-w from 2xl to 4xl for wider appearance. */}
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg mb-8 mx-auto
                                transition-all duration-300 ease-in-out
                                hover:shadow-2xl hover:scale-[1.01] hover:translate-y-[-5px]">
                    <AddItemForm onAddItem={handleAddItem} />
                </div>

                {/* Container for ItemList with hover effect.
                    Increased max-w from 2xl to 4xl for wider appearance. */}
                <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg mx-auto
                                transition-all duration-300 ease-in-out
                                hover:shadow-2xl hover:scale-[1.01] hover:translate-y-[-5px]">
                    <ItemList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
                </div>
            </div>
        </div>
    );
}

export default App;
