// import React from "react";
// import { CoffeeProvider } from "./context/CoffeeContext";
// import IngredientsPage from "./pages/IngredientsPage";
// // import CoffeeItemsPage from "./pages/CoffeeItemsPage";

// const App = () => {
//   return (
//     <CoffeeProvider>
//       <div style={{ padding: "2rem" }}>
//         <h1>Craft Coffee Admin Panel</h1>
//         <IngredientsPage />
//         <hr />
//         {/* <CoffeeItemsPage /> */}
//       </div>
//     </CoffeeProvider>
//   );
// };

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import CoffeeDetailsPage from "./pages/CoffeeDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import CoffeePage from "./pages/CoffeePage";
import IngredientsPage from "./pages/IngredientsPage";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coffee/:id" element={<CoffeeDetailsPage />} />
          <Route path="/coffee" element={<CoffeePage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;