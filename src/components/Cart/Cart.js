import React, { useContext, useState } from "react";
import CartContext from "../../store/cartContext";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";
import { BASE_URL } from "../../common/constant";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;
  const [showOrderForm, setShowOrderForm] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  const postOrderInfos = async (userInfo) => {
    try {
      const response = await fetch(`${BASE_URL}/orders.json`, {
        method: "POST",
        body: JSON.stringify({
          orderItems: cartContext.items,
          userInfo: userInfo,
        }),
      });
      if (response) {
        cartContext.clearItem();
      } else {
        throw new Error("something goes wrong !");
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal onCloseModal={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {!showOrderForm && (
          <button className={classes["button-alt"]} onClick={props.onCloseCart}>
            Close
          </button>
        )}
        {!showOrderForm && hasItems && (
          <button
            onClick={() => setShowOrderForm(true)}
            className={classes.button}
          >
            Order
          </button>
        )}
      </div>
      {showOrderForm && (
        <OrderForm
          submitCart={(userInfo) => postOrderInfos(userInfo)}
          onCloseCart={props.onCloseCart}
        />
      )}
    </Modal>
  );
};

export default Cart;
