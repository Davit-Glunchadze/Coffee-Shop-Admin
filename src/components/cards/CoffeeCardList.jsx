import CoffeeCard from "./CoffeeCard";

const CoffeeCardList = ({ coffees, onDelete, onEdit, onView}) => {
  if (!coffees.length) return <p>No coffee items found.</p>;

  return (
    <div>
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
