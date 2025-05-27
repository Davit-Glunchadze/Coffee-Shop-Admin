import { useParams, useNavigate } from "react-router-dom";
import { useCoffee } from "../context/CoffeeContext";
import styles from "../styles/CoffeeDetailsPage.module.css";

const CoffeeDetailsPage = () => {
  const { id } = useParams();
  const { state, dispatch } = useCoffee();
  const { coffees, ingredients } = state;
  const navigate = useNavigate();

  const coffee = coffees.find((c) => c.id === id);
  if (!coffee) return <p>Coffee not found</p>;

  const ingredientDetails = ingredients.filter((ing) =>
    coffee.ingredients.includes(ing.id)
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
    <div className={styles.detailsWrapper}>
      <button onClick={() => navigate("/dashboard")} className={styles.backBtn}>
        Back to Dashboard
      </button>

      <h1 className={styles.title}>Coffee Details</h1>

      <div className={styles.container}>
        {coffee.image ? (
          <img src={coffee.image} alt={coffee.title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}

        <div className={styles.details}>
          <h2 className={styles.title}>{coffee.title}</h2>

          <div className={styles.tags}>
            <span className={styles.tag}>Origin: {coffee.country}</span>
            <span className={styles.tag}>Caffeine: {coffee.caffeine}mg</span>
            <span className={styles.tag}>
              Price: ₾{calculateTotalPrice().toFixed(2)}
            </span>
          </div>

          <p className={styles.description}>{coffee.description}</p>

          <h3>Ingredients</h3>
          {ingredientDetails.map((ing) => (
            <div className={styles.ingredientItem} key={ing.id}>
              <span>{ing.name}</span>
              <span>
                Strength: {ing.strength} | Flavor: {ing.flavor}
              </span>
            </div>
          ))}

          <div className={styles.actions}>
            <button onClick={handleEdit} className={styles.editBtn}>
              Edit Coffee
            </button>
            <button onClick={handleDelete} className={styles.deleteBtn}>
              Delete Coffee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetailsPage;
