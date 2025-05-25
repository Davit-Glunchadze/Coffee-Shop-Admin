import React from "react";
import { CoffeeProvider } from "./context/CoffeeContext";
import IngredientsPage from "./pages/IngredientsPage";
import CoffeeItemsPage from "./pages/CoffeeItemsPage";

const App = () => {
  return (
    <CoffeeProvider>
      <div style={{ padding: "2rem" }}>
        <h1>Craft Coffee Admin Panel</h1>
        <IngredientsPage />
        <hr />
        <CoffeeItemsPage />
      </div>
    </CoffeeProvider>
  );
};

export default App;