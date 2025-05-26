import React, { useRef, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useCoffee } from "../../context/CoffeeContext";
import styles from "../../styles/IngredientsTable.module.css";

const defaultForm = {
  name: "",
  price: "",
  description: "",
  strength: "",
  flavor: "",
};

const IngredientsTable = () => {
  const { state, dispatch } = useCoffee();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleOpen = (ingredient = null) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (ingredient) {
      setForm({ ...ingredient });
      setEditId(ingredient.id);
    } else {
      setForm(defaultForm);
      setEditId(null);
    }
    setOpen(true);
  };

  const nameRef = useRef();
  useEffect(() => {
    if (open && nameRef.current) {
      nameRef.current.focus();
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setForm(defaultForm);
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(form.price);
    const formatted = {
      ...form,
      price: parsedPrice,
    };

    if (editId) {
      dispatch({
        type: "EDIT_INGREDIENT",
        payload: { ...formatted, id: editId },
      });
      setToastMessage("Ingredient updated successfully");
    } else {
      const newId = `ing_${Date.now()}`;
      dispatch({ type: "ADD_INGREDIENT", payload: { ...formatted, id: newId } });
      setToastMessage("Ingredient added successfully");
    }

    setToastOpen(true);
    handleClose();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this ingredient?")) {
      dispatch({ type: "DELETE_INGREDIENT", payload: id });
      setToastMessage("Ingredient deleted");
      setToastOpen(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Ingredients</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Ingredient
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price (GEL)</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Strength</TableCell>
              <TableCell>Flavor</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.ingredients.length > 0 ? (
              state.ingredients.map((ing) => (
                <TableRow key={ing.id}>
                  <TableCell>{ing.name}</TableCell>
                  <TableCell>{ing.price.toFixed(2)}</TableCell>
                  <TableCell>{ing.description}</TableCell>
                  <TableCell>{ing.strength}</TableCell>
                  <TableCell>{ing.flavor}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(ing)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(ing.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key="empty">
                <TableCell colSpan={6} align="center">
                  No ingredients yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
      >
        <DialogTitle>{editId ? "Edit" : "Add"} Ingredient</DialogTitle>
        <DialogContent className={styles.dialog}>
          <form onSubmit={handleSubmit}>
            {["name", "price", "description", "strength", "flavor"].map((field) => (
              <TextField
                key={field}
                inputRef={field === "name" ? nameRef : null}
                margin="dense"
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                id={field}
                type={field === "price" ? "number" : "text"}
                fullWidth
                value={form[field]}
                onChange={handleChange}
                required
              />
            ))}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {editId ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

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

export default IngredientsTable;
