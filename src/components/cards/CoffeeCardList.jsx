import CoffeeCard from "./CoffeeCard";
import styles from "../../styles/CoffeeCardList.module.css"

const CoffeeCardList = ({ coffees, onDelete, onEdit, onView }) => {
  if (!coffees.length) return <p>No coffee items found.</p>;

  return (
    <div className={styles.cardWrapper}>
      {coffees.map((coffee) => (
        <CoffeeCard
          key={coffee.id}
          coffee={coffee}
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default CoffeeCardList;
