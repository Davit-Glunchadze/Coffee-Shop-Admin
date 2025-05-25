import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
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

  const handleOpen = (ingredient = null) => {
    if (ingredient) {
      setForm(ingredient);
      setEditId(ingredient.id);
    } else {
      setForm(defaultForm);
      setEditId(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(defaultForm);
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const formatted = { ...form, price: parseFloat(form.price) };
    if (editId) {
      dispatch({ type: "EDIT_INGREDIENT", payload: { ...formatted, id: editId } });
    } else {
      dispatch({ type: "ADD_INGREDIENT", payload: formatted });
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this ingredient?")) {
      dispatch({ type: "DELETE_INGREDIENT", payload: id });
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
            {state.ingredients.map((ing) => (
              <TableRow key={ing.id}>
                <TableCell>{ing.name}</TableCell>
                <TableCell>{ing.price.toFixed(2)}</TableCell>
                <TableCell>{ing.description}</TableCell>
                <TableCell>{ing.strength}</TableCell>
                <TableCell>{ing.flavor}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(ing)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(ing.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {state.ingredients.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No ingredients yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? "Edit" : "Add"} Ingredient</DialogTitle>
        <DialogContent className={styles.dialog}>
          {["name", "price", "description", "strength", "flavor"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              type={field === "price" ? "number" : "text"}
              fullWidth
              value={form[field]}
              onChange={handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IngredientsTable;