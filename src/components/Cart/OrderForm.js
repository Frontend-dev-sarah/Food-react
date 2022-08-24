import React, { useRef } from "react";
import Input from "../UI/Input";
import CartClasses from "./Cart.module.css";

const OrderForm = (props) => {
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const submitCart = (event) => {
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;
    event.preventDefault();
    if (
      name.trim().length > 0 &&
      address.trim().length > 0 &&
      phone.trim().length > 0
    ) {
      props.submitCart({
        name: name,
        address: address,
        phone: phone,
      });
      props.onCloseCart();
    } else {
      alert("plese entre all the infos");
    }
  };

  return (
    <form onSubmit={submitCart}>
      <Input
        ref={nameRef}
        lable="Name: "
        input={{
          type: "string",
          style: {
            width: "100%",
          },
        }}
      />
      <Input
        ref={addressRef}
        lable="Address: "
        input={{
          type: "string",
          style: {
            width: "100%",
          },
        }}
      />
      <Input
        ref={phoneRef}
        lable="Phone: "
        input={{
          type: "number",
          style: {
            width: "100%",
          },
        }}
      />
      <div className={CartClasses.actions}>
        <button
          type="button"
          onClick={props.onCloseCart}
          className={CartClasses["button-alt"]}
        >
          Close
        </button>
        {<button className={CartClasses.button}>Confirm</button>}
      </div>
    </form>
  );
};

export default OrderForm;
