import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../features/modalSlice";

const CartContainer = () => {
  const dispatch = useDispatch();

  const { cartItems, total, amount, value } = useSelector((store) => {
    return store.cart;
  });

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is empty</h4>
        </header>
      </section>
    );
  } else {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
        </header>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item}></CartItem>;
        })}

        <footer>
          <hr></hr>
          <div className="cart-total">
            <h4>
              Total <span>{value.toFixed(2)}</span>
            </h4>
          </div>
          <button
            className="btn clear-btn"
            onClick={() => {
              dispatch(toggleModal());
            }}
          >
            Clear
          </button>
        </footer>
      </section>
    );
  }
};

export default CartContainer;
