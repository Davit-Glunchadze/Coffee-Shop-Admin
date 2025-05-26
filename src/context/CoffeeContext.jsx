import { createContext, useContext, useEffect, useReducer } from "react";

const CoffeeContext = createContext();

const initialState = {
  coffees: [],
  ingredients: [],
  editingCoffee: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_COFFEE":
      return { ...state, coffees: [...state.coffees, action.payload] };
    case "DELETE_COFFEE":
      return { ...state, coffees: state.coffees.filter((c) => c.id !== action.payload) };
    case "EDIT_COFFEE":
      return {
        ...state,
        coffees: state.coffees.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "SET_EDITING_COFFEE":
      return { ...state, editingCoffee: action.payload };

    case "ADD_INGREDIENT":
      return { ...state, ingredients: [...state.ingredients, action.payload] };
    case "DELETE_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.filter((i) => i.id !== action.payload),
      };
    case "EDIT_INGREDIENT":
      return {
        ...state,
        ingredients: state.ingredients.map((i) =>
          i.id === action.payload.id ? action.payload : i
        ),
      };
    default:
      return state;
  }
};

export const CoffeeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("coffee_state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const stored = localStorage.getItem("coffee_state");
    if (stored) {
      const parsed = JSON.parse(stored);
      dispatch({ type: "INIT", payload: parsed });
    }
  }, []);

  const addCoffee = (coffee) => {
    dispatch({ type: "ADD_COFFEE", payload: coffee });
  };

  const deleteCoffee = (id) => {
    dispatch({ type: "DELETE_COFFEE", payload: id });
  };

  const updateCoffee = (coffee) => {
    dispatch({ type: "EDIT_COFFEE", payload: coffee });
  };

  const setEditingCoffee = (coffee) => {
    dispatch({ type: "SET_EDITING_COFFEE", payload: coffee });
  };

  const addIngredient = (ingredient) => {
    dispatch({ type: "ADD_INGREDIENT", payload: ingredient });
  };

  const deleteIngredient = (id) => {
    dispatch({ type: "DELETE_INGREDIENT", payload: id });
  };

  const updateIngredient = (ingredient) => {
    dispatch({ type: "EDIT_INGREDIENT", payload: ingredient });
  };

  return (
    <CoffeeContext.Provider
      value={{
        state,
        coffees: state.coffees,
        ingredients: state.ingredients,
        editingCoffee: state.editingCoffee,
        dispatch,
        addCoffee,
        deleteCoffee,
        updateCoffee,
        setEditingCoffee,
        addIngredient,
        deleteIngredient,
        updateIngredient,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => useContext(CoffeeContext);
