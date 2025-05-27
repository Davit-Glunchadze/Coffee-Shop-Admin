import React, { createContext, useState, useEffect } from 'react';

export const CoffeeContext = createContext();

export const CoffeeProvider = ({ children }) => {
  // --- LocalStorage-დან წამოღება
  const loadFromStorage = (key, fallback) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  };

  const [ingredients, setIngredients] = useState(() =>
    loadFromStorage('Manage Ingredients', [
      { id: 1, name: 'Sugar', price: 1, description: 'Sweetener', strength: 'none', flavor: 'sweet' },
      { id: 2, name: 'Milk', price: 2, description: 'Creamy', strength: 'medium', flavor: 'mild' },
    ])
  );

  const [coffees, setCoffees] = useState(() =>
    loadFromStorage('coffees', [
      { 
        id: 1, 
        title: 'Morning Brew', 
        ingredients: [1, 2], 
        description: 'Good morning coffee', 
        image: '', 
        country: 'Ethiopia', 
        caffeine: 'medium',
      }
    ])
  );

  // --- LocalStorage-ში ჩაწერა როდესაც შეიცვლება
  useEffect(() => {
    localStorage.setItem('Manage Ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('coffees', JSON.stringify(coffees));
  }, [coffees]);

  // --- დახმარება შემდეგი id-ის გამოთვლაში
  const getNextId = (items) => {
    const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
    return maxId + 1;
  };

  // ინგრედიენტის დამატება
  const addIngredient = (ingredient) => {
    const newIngredient = { ...ingredient, id: getNextId(ingredients) };
    setIngredients(prev => [...prev, newIngredient]);
  };

  // ინგრედიენტის წაშლა
  const removeIngredient = (id) => {
    setIngredients(prev => prev.filter(i => i.id !== id));
  };

  // ინგრედიენტის რედაქტირება
  const updateIngredient = (updated) => {
    setIngredients(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  };

  // ყავის დამატება
  const addCoffee = (coffee) => {
    const newCoffee = { ...coffee, id: getNextId(coffees) };
    setCoffees(prev => [...prev, newCoffee]);
  };

  // ყავის წაშლა
  const removeCoffee = (id) => {
    setCoffees(prev => prev.filter(c => c.id !== id));
  };

  // ყავის რედაქტირება
  const updateCoffee = (updated) => {
    setCoffees(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  // ფასი კალკულაცია: 2 + ინგრედიენტების ფასი
  const calcCoffeePrice = (coffee) => {
    let sum = coffee.ingredients.reduce((acc, ingId) => {
      const ing = ingredients.find(i => i.id === ingId);
      return acc + (ing ? ing.price : 0);
    }, 0);
    return 2 + sum;
  };

  return (
    <CoffeeContext.Provider value={{
      ingredients, addIngredient, removeIngredient, updateIngredient,
      coffees, addCoffee, removeCoffee, updateCoffee,
      calcCoffeePrice,
    }}>
      {children}
    </CoffeeContext.Provider>
  );
};
