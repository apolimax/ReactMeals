import { useContext } from "react";
import CartContext from "../../store/cartContext";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);
  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
