import React, { useContext, useState } from 'react';
import { CoffeeContext } from './CoffeeContext';
import CoffeeForm from './CoffeeForm';
import './App';

const CoffeeDetails = ({ coffee, onBack, onEdit, onDelete }) => {
  const { ingredients, calcCoffeePrice } = useContext(CoffeeContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  if (!coffee) return null;

  const handleDeleteClick = () => setShowConfirm(true);
  const confirmDelete = () => {
    onDelete(coffee.id);
    setShowConfirm(false);
    onBack();
  };
  const cancelDelete = () => setShowConfirm(false);
  const handleEditClick = () => setEditMode(true);

  return (
    <div className="coffee-details-container">
      {editMode ? (
        <div className="edit-form-container">
          <button className="close-btn" onClick={() => setEditMode(false)}>&times;</button>
          <CoffeeForm editItem={coffee} onClose={() => setEditMode(false)} />
        </div>
      ) : (
        <>
          <img
            src={coffee.image || 'https://via.placeholder.com/300x300?text=No+Image'}
            alt={coffee.title}
            className="coffee-image"
          />
          <div className="coffee-info">
            <h2>{coffee.title}</h2>
            <p><strong>Description:</strong> {coffee.description}</p>
            <p><strong>Origin:</strong> {coffee.country}</p>
            <p><strong>Caffeine:</strong> {coffee.caffeine} mg</p>
            <p><strong>Price:</strong> {calcCoffeePrice(coffee)} ₾</p>
            <p><strong>Ingredients:</strong> {coffee.ingredients.map(id => ingredients.find(i => i.id === id)?.name).join(', ')}</p>

            <div className="button-group">
              <button onClick={onBack}>Back to Dashboard</button>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleDeleteClick}>Delete Coffee</button>
            </div>

            {showConfirm && (
              <div className="modal-backdrop">
                <div className="modal-content">
                  <p>Delete coffee?</p>
                  <div className="modal-buttons">
                    <button className="confirm-delete" onClick={confirmDelete}>Yes</button>
                    <button onClick={cancelDelete}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoffeeDetails;
