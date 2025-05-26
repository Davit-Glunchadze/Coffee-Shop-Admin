import CoffeeForm from "../components/forms/CoffeeForm";

// დროებითი ინგრედიენტები
const dummyIngredients = [
  { id: "ing1", name: "Espresso", price: 1.5 },
  { id: "ing2", name: "Milk", price: 0.5 },
  { id: "ing3", name: "Foam", price: 0.3 },
];

const CoffeePage = () => {
  const handleAddCoffee = (newCoffee) => {
    console.log("New coffee:", newCoffee); // მოგვიანებით გადავა Context-ში
  };

  return (
    <div style={{ padding: "1rem" }}>
      <CoffeeForm
        onAdd={handleAddCoffee}
        ingredientsList={dummyIngredients}
      />
    </div>
  );
};

export default CoffeePage;
