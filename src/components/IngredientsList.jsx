import React, { useContext, useState } from 'react';
import { CoffeeContext } from './CoffeeContext';
import IngredientForm from './IngredientForm';

const IngredientsList = () => {
  const { ingredients, removeIngredient } = useContext(CoffeeContext);
  const [editItem, setEditItem] = useState(null); // თუ არის, ვაჩვენებთ edit ფორმას

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleCloseForm = () => {
    setEditItem(null); // დაბრუნება add ფორმაზე
  };

  return (
    <div>
      {/* ინგრედიენტების სია */}
      <table>
        <thead>
          <tr>
            <th>id</th><th>Name</th><th>Price (₾)</th><th>Strength</th><th>Flavor</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(i => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.name}</td>
              <td>{i.price}</td>
              <td>{i.strength}</td>
              <td>{i.flavor}</td>
              <td>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => removeIngredient(i.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ქვემოთ ჩნდება ან Add ან Edit ფორმა */}
      {editItem ? (
        <IngredientForm editItem={editItem} onClose={handleCloseForm} />
      ) : (
        <IngredientForm />
      )}
    </div>
  );
};

export default IngredientsList;
