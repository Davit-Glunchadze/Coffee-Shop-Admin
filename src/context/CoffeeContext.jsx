import React, { createContext, useReducer, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const CoffeeContext = createContext();

const initialState = {
  ingredients: [],
  coffees: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [...state.ingredients, { ...action.payload, id: uuidv4() }] };
    case "EDIT_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map((ing) =>
          ing.id === action.payload.id ? action.payload : ing
        ),
      };
    case "DELETE_INGREDIENT":
      return { ...state, ingredients: state.ingredients.filter((ing) => ing.id !== action.payload) };

    case "ADD_COFFEE":
      return { ...state, coffees: [...state.coffees, { ...action.payload, id: uuidv4() }] };
    case "EDIT_COFFEE":
      return {
        ...state,
        coffees: state.coffees.map((coffee) =>
          coffee.id === action.payload.id ? action.payload : coffee
        ),
      };
    case "DELETE_COFFEE":
      return { ...state, coffees: state.coffees.filter((coffee) => coffee.id !== action.payload) };

    default:
      return state;
  }
};

export const CoffeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CoffeeContext.Provider value={{ state, dispatch }}>
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => useContext(CoffeeContext);