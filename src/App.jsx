import React, { useState } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert
import "./App.css";

function App() {
  // State Hook - `useState`
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Function to show a success alert with SweetAlert
  const showSuccessAlert = (title, text) => {
    Swal.fire({
      icon: 'success',
      title,
      text,
    });
  };

  function addItem() {
    // Check for empty item
    if (!newItem) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter an item.',
      });
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };

    // Add new item to items array
    setItems((oldList) => [...oldList, item]);

    // Reset newItem back to original state
    setNewItem("");

    showSuccessAlert('Item Added!', 'Your item has been added to the list.');
  }

  function deleteItem(id) {
    setShowDeleteModal(false); // Close the modal
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);

    showSuccessAlert('Item Deleted!', 'The item has been deleted.');
  }

  // ... Your editItem function remains the same ...

  return (
    <div className="app-container">
      <div className="app">
        <h1>My Todo List</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Add an item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={addItem}>Add</button>
        </div>

        <ul>
          {items.map((item) => {
            return (
              <div key={item.id} className="todo-item">
                <span onClick={() => setShowEdit(item.id)}>{item.value}</span>
                <div>
                  <button className="delete-button" onClick={() => {
                    setItemToDelete(item.id);
                    setShowDeleteModal(true);
                  }}>
                    ❌
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <button
              className="modal-button confirm"
              onClick={() => {
                deleteItem(itemToDelete);
              }}
            >
              Confirm
            </button>
            <button
              className="modal-button cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
