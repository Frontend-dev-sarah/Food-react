import {
  GET_MEALS_FAIL,
  GET_MEALS_PENDING,
  GET_MEALS_SUCCESS,
  POST_MEAL_FAIL,
  POST_MEAL_PENDING,
  POST_MEAL_SUCCESS,
} from "./actions";
import { mealListInitialState } from "./initialState";

const mealReducer = (state = mealListInitialState, action) => {
  switch (action.type) {
    case GET_MEALS_SUCCESS:
      return {
        ...state,
        mealList: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_MEALS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_MEALS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case POST_MEAL_SUCCESS:
      return {
        ...state,
        errorPost: null,
        isPostLoading: false,
      };
    case POST_MEAL_PENDING:
      return {
        ...state,
        errorPost: null,
        isPostLoading: true,
      };
    case POST_MEAL_FAIL:
      return {
        ...state,
        errorPost: action.errorPost,
        isPostLoading: false,
      };
    default:
      return state;
  }
};

export default mealReducer;
