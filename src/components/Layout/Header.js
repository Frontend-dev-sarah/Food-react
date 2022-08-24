import { Fragment } from "react";
import foodImage from "../../assets/meals.jpeg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton/HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food</h1>
        <HeaderCartButton onClickCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={foodImage} alt="food" />
      </div>
    </Fragment>
  );
};

export default Header;
