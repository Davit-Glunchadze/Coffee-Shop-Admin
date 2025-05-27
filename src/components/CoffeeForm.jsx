import React, { useState, useContext, useEffect } from 'react';
import { CoffeeContext } from './CoffeeContext';

const CoffeeForm = ({ editItem, onClose }) => {
  const { addCoffee, updateCoffee, ingredients } = useContext(CoffeeContext);

  const [formData, setFormData] = useState({
    title: '',
    ingredients: [],
    description: '',
    image: '',
    country: '',
    caffeine: '',
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title,
        ingredients: editItem.ingredients,
        description: editItem.description,
        image: editItem.image,
        country: editItem.country,
        caffeine: editItem.caffeine,
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIngredientsChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(Number(options[i].value));
      }
    }
    setFormData(prev => ({ ...prev, ingredients: selected }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      updateCoffee({ ...editItem, ...formData });
    } else {
      addCoffee(formData);
      setFormData({
        title: '',
        ingredients: [],
        description: '',
        image: '',
        country: '',
        caffeine: '',
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editItem ? 'Edit Coffee' : 'Add New Coffee'}</h2>

      <input
        name="title"
        placeholder="Coffee Name"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        name="country"
        placeholder="Country of Origin"
        value={formData.country}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <input
        name="caffeine"
        placeholder="Caffeine (mg)"
        value={formData.caffeine}
        onChange={handleChange}
      />

      <select
        multiple
        value={formData.ingredients}
        onChange={handleIngredientsChange}
      >
        {ingredients.map(i => (
          <option key={i.id} value={i.id}>{i.name}</option>
        ))}
      </select>

      <button type="submit">
        {editItem ? 'Update Coffee' : 'Add Coffee'}
      </button>

      {onClose && (
        <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default CoffeeForm;
