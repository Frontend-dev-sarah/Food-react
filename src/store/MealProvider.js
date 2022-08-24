import { useReducer, useEffect, useCallback } from "react";
import { BASE_URL } from "../common/constant";
import useHttp from "../hooks/useHttp";
import {
  GET_MEALS_FAIL,
  GET_MEALS_PENDING,
  GET_MEALS_SUCCESS,
  POST_MEAL_FAIL,
  POST_MEAL_PENDING,
  POST_MEAL_SUCCESS,
} from "./actions";
import { mealListInitialState } from "./initialState";
import MealContext from "./mealContext";
import mealReducer from "./mealReducer";

const MealProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealReducer, mealListInitialState);

  const getMealList = useCallback(async () => {
    dispatch({
      type: GET_MEALS_PENDING,
    });
    //TODO
    //try catch trick, async method return a promise, if an error inside a promise,
    //the promise will be rejected, then not go to catch block, transform to .catch() block inside
    //useEffect getMealList().catch((e) => {dispatch({
    //     type: GET_MEALS_FAIL,
    //     payload: e.message,
    //   });
    //})
    try {
      const response = await fetch(`${BASE_URL}/meals.json`);
      if (!response.ok) {
        throw new Error("Somethig goes wrong !");
      }
      const data = await response.json();
      let formatedMealList = [];
      for (const key in data) {
        formatedMealList.push(data[key]);
      }
      dispatch({
        type: GET_MEALS_SUCCESS,
        payload: formatedMealList,
      });
    } catch (error) {
      //error by default is an object with message property
      dispatch({
        type: GET_MEALS_FAIL,
        payload: error.message,
      });
    }
  }, []);

  useEffect(() => {
    getMealList();
  }, [getMealList]);

  const postMealItem = async (meals) => {
    dispatch({ type: POST_MEAL_PENDING });
    // useHttp(BASE_URL,
    // "POST",
    // meals,
    // dispatch({ type: POST_MEAL_SUCCESS }),
    // dispatch({ type: POST_MEAL_FAIL, payload: error })
    // )
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        body: JSON.stringify(meals),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        dispatch({ type: POST_MEAL_SUCCESS });
      } else {
        throw new Error("Add meal failed !");
      }
      return response;
    } catch (error) {
      dispatch({ type: POST_MEAL_FAIL, payload: error.message });
    }
  };

  const mealContext = {
    mealList: state.mealList,
    isLoading: state.isLoading,
    error: state.error,
    mealItem: state.mealItem,
    isPostLoading: state.isPostLoading,
    errorPost: state.errorPost,
    getMealList: getMealList,
    postMealItem: postMealItem,
  };
  return (
    <MealContext.Provider value={mealContext}>{children}</MealContext.Provider>
  );
};

export default MealProvider;
