import React, { useContext, useState } from 'react';
import { CoffeeContext } from './CoffeeContext';
import CoffeeForm from './CoffeeForm';
import CoffeeDetails from './CoffeeDetails';

const Dashboard = () => {
  const { coffees, ingredients, removeCoffee, calcCoffeePrice } = useContext(CoffeeContext);
  const [editItem, setEditItem] = useState(null);
  const [detailItem, setDetailItem] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleViewMore = (coffee) => setDetailItem(coffee);
  const handleEdit = (coffee) => setEditItem(coffee);
  const handleCloseForm = () => setEditItem(null);
  const handleBackFromDetails = () => setDetailItem(null);

  const handleDeleteCoffee = (id) => {
    removeCoffee(id);
    setConfirmDeleteId(null);
    setDetailItem(null);
  };

  const handleDeleteClick = (id) => setConfirmDeleteId(id);
  const cancelDelete = () => setConfirmDeleteId(null);

  if (detailItem) {
    return (
      <CoffeeDetails
        coffee={detailItem}
        onBack={handleBackFromDetails}
        onEdit={handleEdit}
        onDelete={handleDeleteCoffee}
      />
    );
  }

  if (editItem) {
    return (
      <div className="dashboard-form-wrapper">
        <button onClick={handleCloseForm} className="back-btn">&larr; Back to Dashboard</button>
        <CoffeeForm editItem={editItem} onClose={handleCloseForm} />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>All Coffees</h2>
      <table className="coffee-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Ingredients</th><th>Description</th><th>Country</th><th>Caffeine</th><th>Total Price (₾)</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>{c.ingredients.map(id => ingredients.find(i => i.id === id)?.name).join(', ')}</td>
              <td>{c.description}</td>
              <td>{c.country}</td>
              <td>{c.caffeine}</td>
              <td>{calcCoffeePrice(c)}</td>
              <td>
                <button onClick={() => handleDeleteClick(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="cards-title">Coffee Cards</h2>
      <div className="coffee-card-container">
        {coffees.map(coffee => (
          <div key={coffee.id} className="coffee-card">
            <img
              src={coffee.image || 'https://via.placeholder.com/250x150?text=No+Image'}
              alt={coffee.title}
              className="coffee-card-img"
            />
            <h3>{coffee.title}</h3>
            <p>
              {coffee.description} <br />
              <strong>Origin:</strong> {coffee.country} <br />
              <strong>Caffeine:</strong> {coffee.caffeine} mg <br />
              <strong>Price:</strong> {calcCoffeePrice(coffee)} ₾
            </p>
            <div className="coffee-card-buttons">
              <button onClick={() => handleViewMore(coffee)}>View More</button>
              <button onClick={() => handleEdit(coffee)}>Edit</button>
              <button onClick={() => handleDeleteClick(coffee.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {confirmDeleteId !== null && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>Delete coffee?</p>
            <div className="modal-buttons">
              <button onClick={() => handleDeleteCoffee(confirmDeleteId)} className="confirm-delete">Yes</button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
