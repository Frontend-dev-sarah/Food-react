import { useReducer } from "react";
import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "./actions";
import CartContext from "./cartContext";
import cartReducer from "./cartReducer";
import { cartInitialState } from "./initialState";

const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addItemToCart = (item) => {
    dispatch({ type: ADD_CART_ITEM, payload: item });
  };
  const removeItemFromCart = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  //Context data and methods
  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
