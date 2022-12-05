import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartItems, updateTotals } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  let { cartItems, isLoading } = useSelector((store) => {
    return store.cart;
  });
  let { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  useEffect(() => {
    dispatch(updateTotals());
  }, [cartItems]);

  return (
    <div className="App">
      <Navbar></Navbar>
      {isOpen && <Modal />}
      {!isLoading ? (
        <CartContainer></CartContainer>
      ) : (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default App;
