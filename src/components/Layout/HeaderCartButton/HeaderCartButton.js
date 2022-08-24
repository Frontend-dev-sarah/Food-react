import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cartContext";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const [buttonHightlight, setButtonHightlight] = useState(false);
  //the total number of items added to the cart
  const cartAmount = cartContext.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    buttonHightlight ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setButtonHightlight(true);
    const timer = setTimeout(() => {
      setButtonHightlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button className={buttonClasses} onClick={props.onClickCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
