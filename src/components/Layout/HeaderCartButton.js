import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cartContext";
import CartIcon from "../Cart/CartIcon";

import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const { items } = useContext(CartContext);
  const [isCartSummaryHightlighted, setIsCartSummaryHightlighted] =
    useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsCartSummaryHightlighted(true);

    const timer = setTimeout(() => {
      setIsCartSummaryHightlighted(false);
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [items]);

  const numberOfCartItems = items.reduce((curr, item) => {
    return (curr += item.amount);
  }, 0);

  const buttonClasses = `${styles.button} ${
    isCartSummaryHightlighted ? styles.bump : ""
  }`;

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
