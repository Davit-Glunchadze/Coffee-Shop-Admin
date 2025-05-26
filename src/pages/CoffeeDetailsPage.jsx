import { useParams, useNavigate } from "react-router-dom";
import { useCoffee } from "../context/CoffeeContext";

const CoffeeDetailsPage = () => {
  const { id } = useParams();
  const { state, dispatch } = useCoffee();
  const { coffees, ingredients } = state;
  const navigate = useNavigate();

  const coffee = coffees.find((c) => c.id === id);
  if (!coffee) return <p>Coffee not found</p>;

  const ingredientDetails = ingredients.filter((ing) =>
    coffee.ingredients.includes(ing.name)
  );

  const calculateTotalPrice = () => {
    const ingredientTotal = ingredientDetails.reduce(
      (sum, ing) => sum + Number(ing.price),
      0
    );
    return Number(coffee.price) + ingredientTotal;
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this coffee?")) {
      dispatch({ type: "DELETE_COFFEE", payload: coffee.id });
      navigate("/dashboard");
    }
  };

  const handleEdit = () => {
    dispatch({ type: "SET_EDITING_COFFEE", payload: coffee });
    navigate("/coffee");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "1rem" }}
      >
        Back to Dashboard
      </button>

      <h1>Coffee Details</h1>

      <div style={{ display: "flex", gap: "2rem" }}>
        {/* სურათი ან placeholder */}
        {coffee.image ? (
          <img
            src={coffee.image}
            alt={coffee.title}
            style={{
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        ) : (
          <div
            style={{
              width: "300px",
              height: "200px",
              backgroundColor: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <span>No Image</span>
          </div>
        )}

        {/* დეტალები */}
        <div>
          <h2>{coffee.title}</h2>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <span
              style={{
                background: "#dcbfa6",
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              Origin: {coffee.country}
            </span>
            <span
              style={{
                background: "#dcbfa6",
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              Caffeine: {coffee.caffeine}mg
            </span>
            <span
              style={{
                background: "#dcbfa6",
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              Price: ₾{calculateTotalPrice().toFixed(2)}
            </span>
          </div>

          <p style={{ marginBottom: "1rem" }}>{coffee.description}</p>

          <h3>Ingredients</h3>
          {ingredientDetails.map((ing) => (
            <div
              key={ing.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: "#f5f5f5",
                padding: "8px 12px",
                borderRadius: "6px",
                marginBottom: "0.5rem",
              }}
            >
              <span>{ing.name}</span>
              <span>
                Strength: {ing.strength} | Flavor: {ing.flavor}
              </span>
            </div>
          ))}

          <div style={{ marginTop: "1.5rem" }}>
            <button onClick={handleEdit} style={{ marginRight: "0.5rem" }}>
              Edit Coffee
            </button>
            <button
              onClick={handleDelete}
              style={{ backgroundColor: "#e53935", color: "white" }}
            >
              Delete Coffee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetailsPage;
