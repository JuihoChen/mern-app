// client/src/ItemList.js
import React from 'react';

function ItemList({ items }) { // items will be a prop (the array of items from App.js)
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px' }}>
      <h2>Existing Items</h2>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {items.map(item => (
            <li key={item._id} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px dotted #eee' }}>
              <strong>{item.name}</strong> - {item.description} (Qty: {item.quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;