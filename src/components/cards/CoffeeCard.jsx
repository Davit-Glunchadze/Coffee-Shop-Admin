import { useCoffee } from "../../context/CoffeeContext";

const CoffeeCard = ({ coffee, onDelete, onEdit, onView }) => {
  const { state } = useCoffee();
  const ingredients = state.ingredients;

  const calculateTotalPrice = (coffee) => {
    const ingredientTotal = ingredients
      .filter((ing) => coffee.ingredients.includes(ing.id))
      .reduce((sum, ing) => sum + Number(ing.price), 0);
    return Number(coffee.price) + ingredientTotal;
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px", width: "250px" }}>
      {coffee.image ? (
        <img
          src={coffee.image}
          alt={coffee.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "6px",
            display: "block"
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "180px",
            backgroundColor: "#eee",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.9rem",
            color: "#777"
          }}
        >
          No Image
        </div>
      )}

      <h3>{coffee.title}</h3>
      <p>{coffee.description}</p>
      <p><strong>Origin:</strong> {coffee.country}</p>
      <p><strong>Caffeine:</strong> {coffee.caffeine} mg</p>
      <p><strong>Total Price:</strong> ₾{calculateTotalPrice(coffee).toFixed(2)}</p>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.25rem" }}>
        <button onClick={() => onView(coffee)}>View More</button>
        <button onClick={() => onEdit(coffee)}>Edit</button>
        <button onClick={() => onDelete(coffee.id)}>Delete</button>
      </div>
    </div>
  );
};

export default CoffeeCard;
