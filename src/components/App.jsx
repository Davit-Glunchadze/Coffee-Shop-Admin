import React, { useState } from 'react';
import { CoffeeProvider } from './CoffeeContext';
import IngredientsList from './IngredientsList';
import CoffeeForm from './CoffeeForm';
import Dashboard from './Dashboard';
import CoffeeDetails from './CoffeeDetails';
import './App.css';

const App = () => {
  const [view, setView] = useState('ingredients');
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleViewMore = (coffee) => {
    setSelectedCoffee(coffee);
    setView('coffeeDetails');
  };

  const handleEditCoffee = (coffee) => {
    setSelectedCoffee(coffee);
    setShowEditPopup(true);
  };

  const handleCloseForm = () => {
    setSelectedCoffee(null);
    setShowEditPopup(false);
    if (view !== 'Dashboard') {
      setView('Dashboard');
    }
  };

  return (
    <CoffeeProvider>
      <div className="app-layout">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h1>Coffee Admin</h1>
            <p>Management Panel</p>
          </div>
          <button className={view === 'Dashboard' ? 'active' : ''} onClick={() => setView('Dashboard')}>Dashboard</button>
          <button className={view === 'ingredients' ? 'active' : ''} onClick={() => setView('ingredients')}>Manage Ingredients</button>
          <button className={view === 'addCoffee' ? 'active' : ''} onClick={() => {
            setSelectedCoffee(null);
            setView('addCoffee');
          }}>Add Coffee</button>
        </nav>
        
        <main className="main-content">
          {view === 'Dashboard' && <Dashboard onViewMore={handleViewMore} onEdit={handleEditCoffee} />}
          {view === 'ingredients' && <IngredientsList />}
          {view === 'addCoffee' && <CoffeeForm onClose={handleCloseForm} />}
          {view === 'coffeeDetails' && selectedCoffee && (
            <CoffeeDetails
              coffee={selectedCoffee}
              onEdit={handleEditCoffee}
              onDelete={(id) => setView('Dashboard')}
              onBack={() => setView('Dashboard')}
            />
          )}
        </main>

        {/* Edit Coffee Popup */}
        {showEditPopup && selectedCoffee && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="popup-close" onClick={handleCloseForm}>&times;</button>
              <CoffeeForm editItem={selectedCoffee} onClose={handleCloseForm} />
            </div>
          </div>
        )}
      </div>
    </CoffeeProvider>
  );
};

export default App;
