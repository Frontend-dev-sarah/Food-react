import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";
import MealProvider from "./store/MealProvider";

function App() {
  const [showCart, setsShowCart] = useState(false);

  const showCartHandler = () => {
    setsShowCart(true);
  };
  const hideCartHandler = () => {
    setsShowCart(false);
  };
  return (
    <MealProvider>
      <CartProvider>
        {showCart && <Cart onCloseCart={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </MealProvider>
  );
}

export default App;
