import { Fragment } from "react";
import AddMeal from "./AddMeal";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AddMeal />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
