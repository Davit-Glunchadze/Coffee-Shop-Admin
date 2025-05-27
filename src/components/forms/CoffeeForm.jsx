import { useState, useEffect } from "react";
import { useCoffee } from "../../context/CoffeeContext";
import { Snackbar, Alert } from "@mui/material";
import styles from "../../styles/CoffeeForm.module.css";


const CoffeeForm = () => {
  const { state, dispatch } = useCoffee();

  const ingredients = state.ingredients;
  const editingCoffee = state.editingCoffee;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [caffeine, setCaffeine] = useState("");
  const [price, setPrice] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (editingCoffee) {
      setTitle(editingCoffee.title || "");
      setDescription(editingCoffee.description || "");
      setCountry(editingCoffee.country || "");
      setImage(editingCoffee.image || "");

      setCaffeine(
        typeof editingCoffee.caffeine === "number"
          ? editingCoffee.caffeine.toString()
          : ""
      );

      setPrice(
        typeof editingCoffee.price === "number"
          ? editingCoffee.price.toString()
          : ""
      );

      const allIngredientNames = ingredients.map((ing) => ing.name);
      const validIngredients = (editingCoffee.ingredients || []).filter((name) =>
        allIngredientNames.includes(name)
      );

      setSelectedIngredients(validIngredients);
    }
  }, [editingCoffee, ingredients]);

  const handleIngredientChange = (e) => {
    const values = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setSelectedIngredients(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCoffee = {
      id: editingCoffee?.id || `coffee_${Date.now()}`,
      title,
      description,
      country,
      image,
      caffeine: parseFloat(caffeine),
      price: parseFloat(price),
      ingredients: selectedIngredients,
    };

    if (editingCoffee) {
      dispatch({ type: "EDIT_COFFEE", payload: newCoffee });
      setToastMessage("Coffee updated successfully");
    } else {
      dispatch({ type: "ADD_COFFEE", payload: newCoffee });
      setToastMessage("Coffee added successfully");
    }

    setShowToast(true);

    setTitle("");
    setDescription("");
    setCountry("");
    setImage("");
    setCaffeine("");
    setPrice("");
    setSelectedIngredients([]);
    dispatch({ type: "SET_EDITING_COFFEE", payload: null });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <h2>{editingCoffee ? "Edit Coffee" : "Add New Coffee"}</h2>

      <label htmlFor="title">Coffee Name</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Coffee Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="country">Country of Origin</label>
      <input
        id="country"
        name="country"
        type="text"
        placeholder="Country of Origin"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="image">Image URL</label>
      <input
        id="image"
        name="image"
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <label htmlFor="caffeine">Caffeine (mg)</label>
      <input
        id="caffeine"
        name="caffeine"
        type="number"
        placeholder="Caffeine (mg)"
        value={isNaN(caffeine) ? "" : caffeine}
        onChange={(e) => setCaffeine(e.target.value)}
        required
      />

      <label htmlFor="price">Base Price (₾)</label>
      <input
        id="price"
        name="price"
        type="number"
        placeholder="Base Price (₾)"
        value={isNaN(price) ? "" : price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <label htmlFor="ingredients">Ingredients</label>
      <select
        id="ingredients"
        name="ingredients"
        multiple
        value={selectedIngredients}
        onChange={handleIngredientChange}
      >
        {ingredients.map((ing) => (
          <option key={ing.id} value={ing.id}>
            {ing.name} - ₾{ing.price}
          </option>
        ))}
      </select>

      <button type="submit">
        {editingCoffee ? "Save Changes" : "Add Coffee"}
      </button>

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setShowToast(false)}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default CoffeeForm;
