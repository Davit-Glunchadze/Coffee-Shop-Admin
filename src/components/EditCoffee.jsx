import React, { useContext, useState, useEffect } from 'react';
import { CoffeeContext } from './CoffeeContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditCoffee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { coffees, ingredients, updateCoffee } = useContext(CoffeeContext);

  // ვპოულობთ კონკრეტულ ყავას რედაქტირებისთვის
  const coffeeToEdit = coffees.find(c => c.id === parseInt(id));

  // ფორმის მონაცემები state-ში
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    country: '',
    caffeine: '',
    ingredients: []
  });

  // კომპონენტის დატვირთვისას თუ ყავა არსებობს, ვავსებთ ფორმას მის მონაცემებით
  useEffect(() => {
    if (coffeeToEdit) {
      setFormData(coffeeToEdit);
    }
  }, [coffeeToEdit]);

  // საერთო input-ების ცვლილების დამუშავება
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // checkbox-ების ცვლილება — ინგრედიენტების არჩევა/გამორთვა
  const handleCheckboxChange = (id) => {
    setFormData(prev => {
      const exists = prev.ingredients.includes(id);
      return {
        ...prev,
        ingredients: exists
          ? prev.ingredients.filter(i => i !== id)
          : [...prev.ingredients, id]
      };
    });
  };

  // ფორმის წარდგენა და ყავის განახლება
  const handleSubmit = (e) => {
    e.preventDefault();
    updateCoffee({ ...formData, id: coffeeToEdit.id });
    navigate('/dashboard');  // წაიყვანს დეშბორდზე ცვლილებების შემდეგ
  };

  if (!coffeeToEdit) return <p>Coffee not found.</p>;

  return (
    <div className="edit-coffee-container">
      <h2>Edit Coffee</h2>
      <form className="edit-coffee-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>

        <label>
          Country:
          <input name="country" value={formData.country} onChange={handleChange} required />
        </label>

        <label>
          Caffeine (mg):
          <input name="caffeine" value={formData.caffeine} onChange={handleChange} required />
        </label>

        <label>
          Image URL:
          <input name="image" value={formData.image} onChange={handleChange} />
        </label>

        <fieldset>
          <legend>Ingredients</legend>
          {ingredients.map(ing => (
            <label key={ing.id}>
              <input
                type="checkbox"
                checked={formData.ingredients.includes(ing.id)}
                onChange={() => handleCheckboxChange(ing.id)}
              />
              {ing.name}
            </label>
          ))}
        </fieldset>

        <button type="submit">Update Coffee</button>
      </form>
    </div>
  );
};

export default EditCoffee;
