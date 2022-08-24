import { createContext } from "react";
const MealContext = createContext({
  mealList: [],
  mealItem: {},
  isLoading: false,
  error: null,
  isPostLoading: false,
  errorPost: null,
  getMealList: () => {},
  postMealItem: () => {},
});

export default MealContext;
