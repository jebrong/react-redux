import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateTotals } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  let { cartItems } = useSelector((store) => {
    return store.cart;
  });

  let { isOpen } = useSelector((store) => {
    return store.modal;
  });

  useEffect(() => {
    dispatch(updateTotals());
  }, [cartItems]);

  return (
    <div className="App">
      <Navbar></Navbar>
      {isOpen && <Modal />}
      <CartContainer></CartContainer>
    </div>
  );
}

export default App;
