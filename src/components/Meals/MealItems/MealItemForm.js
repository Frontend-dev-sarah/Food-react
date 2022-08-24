import { useState, useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isValid, setIsvalid] = useState(true);
  const amountRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const amount = amountRef.current.value; //even type of data is number, its value is always a string
    const enteredAmount = +amount; // transform string to number

    if (amount.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setIsvalid(false);
      return;
    }
    props.onAddToCart(enteredAmount);
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountRef}
        lable="Amount"
        input={{
          id: "amount+" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
