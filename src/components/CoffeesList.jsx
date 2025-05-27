import React, { useContext, useState } from 'react';
import { CoffeeContext } from './CoffeeContext';
import CoffeeForm from './CoffeeForm';
import './CoffeesList.css';

const CoffeesList = () => {
  const { coffees, ingredients, removeCoffee, calcCoffeePrice } = useContext(CoffeeContext);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const openForm = (item = null) => {
    setEditItem(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditItem(null);
    setShowForm(false);
  };

  return (
    <div className="coffees-list-container">
      <button className="add-coffee-btn" onClick={() => openForm()}>Add Coffee</button>

      {showForm && <CoffeeForm editItem={editItem} onClose={closeForm} />}

      <table className="coffees-table">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Ingredients</th>
            <th>Description</th>
            <th>Country</th>
            <th>Caffeine</th>
            <th>Total Price (₾)</th>
            <th>Actions</th>
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
              <td className="actions-cell">
                <button className="edit-btn" onClick={() => openForm(c)}>Edit</button>
                <button className="delete-btn" onClick={() => removeCoffee(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoffeesList;
