import { useCoffee } from "../../context/CoffeeContext";
import styles from "../../styles/CoffeeItemsTable.module.css";


const CoffeeItemsTable = ({ data, onDelete, onEdit, onView }) => {
  const { state } = useCoffee();
  const ingredients = state.ingredients;

  const calculateTotalPrice = (coffee) => {
    const ingredientTotal = ingredients
      .filter((ing) => coffee.ingredients.includes(ing.id))
      .reduce((sum, ing) => sum + Number(ing.price), 0);
    return Number(coffee.price) + ingredientTotal;
  };

  return (
    <table className={styles.table}>
  <thead>
    <tr>
      <th>Name</th>
      <th>Country</th>
      <th>Caffeine</th>
      <th>Total Price</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((coffee) => (
      <tr key={coffee.id}>
        <td>{coffee.title}</td>
        <td>{coffee.country}</td>
        <td>{coffee.caffeine} mg</td>
        <td>₾{calculateTotalPrice(coffee).toFixed(2)}</td>
        <td className={styles.actionCell}>
          <button className={`${styles.btn} ${styles.view}`} onClick={() => onView(coffee)}>View</button>
          <button className={`${styles.btn} ${styles.edit}`} onClick={() => onEdit(coffee)}>Edit</button>
          <button className={`${styles.btn} ${styles.delete}`} onClick={() => onDelete(coffee.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  );
};

export default CoffeeItemsTable;
