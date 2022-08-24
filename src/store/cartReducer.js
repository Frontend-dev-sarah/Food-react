import { ADD_CART_ITEM, CLEAR_CART_ITEM, REMOVE_CART_ITEM } from "./actions";
import { cartInitialState } from "./initialState";

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      let updatedItems = [];

      let existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        existingItem = {
          ...existingItem,
          amount: existingItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = existingItem;
      } else updatedItems = state.items.concat(action.payload);

      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case REMOVE_CART_ITEM:
      let newItems = [];
      let newItem = state.items.find((item) => item.id === action.payload);
      if (newItem.amount === 1) {
        newItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItemIndex = state.items.findIndex(
          (item) => item.id === action.payload
        );
        newItem = { ...newItem, amount: newItem.amount - 1 };
        newItems = [...state.items];
        newItems[updatedItemIndex] = newItem;
      }

      const newTotalAmount = state.totalAmount - newItem.price;

      return {
        items: newItems,
        totalAmount: newTotalAmount,
      };
    case CLEAR_CART_ITEM:
      return cartInitialState;
    default:
      return state;
  }
};

export default cartReducer;
