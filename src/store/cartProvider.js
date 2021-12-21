import { useReducer } from "react";
import CartContext from "./cartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemId = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemId];
    let updatedItems;

    if (!!existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemId] = updateItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemId = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemId];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updateItems;

    if (existingCartItem.amount === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItems = [...state.items];
      updateItems[existingCartItemId] = updatedItem;
    }

    return {
      items: updateItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cart = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cart}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
