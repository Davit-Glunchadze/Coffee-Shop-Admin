import { useNavigate } from "react-router-dom";
import { useCoffee } from "../context/CoffeeContext";
import CoffeeCardList from "../components/cards/CoffeeCardList";
import CoffeeItemsTable from "../components/tables/CoffeeItemsTable";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import styles from "../styles/DashboardPage.module.css";

const DashboardPage = () => {
  const { state, dispatch } = useCoffee();
  const { coffees, ingredients } = state;
  const navigate = useNavigate();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleEdit = (coffee) => {
    dispatch({ type: "SET_EDITING_COFFEE", payload: coffee });
    navigate("/coffee");
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_COFFEE", payload: id });
    setToastMessage("Coffee deleted successfully");
    setToastOpen(true);
  };

  const handleView = (coffee) => {
    navigate(`/coffee/${coffee.id}`);
  };

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Coffee Dashboard</h1>
        <button
          className={styles.dashboardAddBtn}
          onClick={() => navigate("/coffee")}
        >
          Add New Coffee
        </button>
      </div>

      <div className={styles.dashboardTableWrapper}>
        <CoffeeItemsTable
          data={coffees}
          ingredients={ingredients}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      </div>

      <h2 className={styles.dashboardSubtitle}>Coffee Cards</h2>
      <CoffeeCardList
        coffees={coffees}
        ingredients={ingredients}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setToastOpen(false)}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DashboardPage;
