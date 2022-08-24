import { useContext } from "react";
import MealContext from "../../store/mealContext";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealCtx = useContext(MealContext);
  let content = [];

  if (mealCtx.mealList.length > 0) {
    content = mealCtx.mealList.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }
  if (mealCtx.mealList.length === 0) {
    content = <p>No meal found</p>;
  }
  if (mealCtx.isLoading) {
    content = <p>Loading ...</p>;
  }
  if (mealCtx.error) {
    content = <p>{mealCtx.error}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
