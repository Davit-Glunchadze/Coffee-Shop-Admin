import { useCoffee } from "../../context/CoffeeContext";
import styles from "../../styles/CoffeeCard.module.css";

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
    <div className={styles.card}>
      {coffee.image ? (
        <img src={coffee.image} alt={coffee.title} />
      ) : (
        <div className={styles.noImage}>No Image</div>
      )}

      <h3>{coffee.title}</h3>
      <p>{coffee.description}</p>
      <p>
        <strong>Origin:</strong> {coffee.country}
      </p>
      <p>
        <strong>Caffeine:</strong> {coffee.caffeine} mg
      </p>
      <p>
        <strong>Total Price:</strong> ₾{calculateTotalPrice(coffee).toFixed(2)}
      </p>

      <div className={styles.cardActions}>
        <button onClick={() => onView(coffee)}>View More</button>
        <button onClick={() => onEdit(coffee)}>Edit</button>
        <button onClick={() => onDelete(coffee.id)}>Delete</button>
      </div>
    </div>
  );
};

export default CoffeeCard;
