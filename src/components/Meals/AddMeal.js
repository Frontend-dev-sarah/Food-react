import { useRef, useContext } from "react";
import MealContext from "../../store/mealContext";

const AddMeal = () => {
  const mealCtx = useContext(MealContext);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    mealCtx.postMealItem({
      id: Number(mealCtx.mealList.length + 1),
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: Number(priceRef.current.value),
    });
  };
  let content = (
    <form onSubmit={onSubmit}>
      Name: <input ref={nameRef} />
      Description: <input ref={descriptionRef} />
      Price: <input ref={priceRef} />
      {mealCtx.errorPost && <div>{mealCtx.errorPost}</div>}
      <button>Submit</button>
    </form>
  );

  if (mealCtx.isPostLoading) {
    content = <p>Meal is adding ...</p>;
  }
  return <div>{content}</div>;
};

export default AddMeal;
