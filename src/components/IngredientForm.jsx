import React, { useState, useContext, useEffect } from 'react';
import { CoffeeContext } from './CoffeeContext';

const IngredientForm = ({ editItem = null, onClose }) => {
  const { addIngredient, updateIngredient } = useContext(CoffeeContext);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    strength: '',
    flavor: '',
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        price: editItem.price,
        description: editItem.description,
        strength: editItem.strength,
        flavor: editItem.flavor,
      });
    } else {
      // სუფთა ფორმა
      setFormData({
        name: '',
        price: '',
        description: '',
        strength: '',
        flavor: '',
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, price: Number(formData.price) };

    if (editItem) {
      updateIngredient({ ...editItem, ...dataToSubmit });
    } else {
      addIngredient(dataToSubmit);
    }

    // სუფთავდება ფორმა
    setFormData({
      name: '',
      price: '',
      description: '',
      strength: '',
      flavor: '',
    });

    onClose(); // ფორმის დახურვა Edit რეჟიმში
  };

  return (
    <form onSubmit={handleSubmit} className="ingredient-form">
      <h2>{editItem ? 'Edit Ingredient' : 'Add New Ingredient'}</h2>
      
      <div className="row">
        <label>
          Name:
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="row">
        <label className="full-width">
          Description:
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="row">
        <label>
          Strength:
          <select
            name="strength"
            value={formData.strength}
            onChange={handleChange}
          >
            <option value="">Select strength</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="None">None</option>

          </select>
        </label>

        <label>
          Flavor Profile:
          <input
            name="flavor"
            placeholder="Flavor"
            value={formData.flavor}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="buttons">
        <button type="submit">
          {editItem ? 'Update Ingredient' : 'Add Ingredient'}
        </button>

        {/* Cancel ღილაკი მხოლოდ Edit რეჟიმში */}
        {editItem && (
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default IngredientForm;
