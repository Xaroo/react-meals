import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems;
  switch (action.type) {
    case "ADD":
      if (state.items.find((item) => item.id === action.item.id)) {
        updatedItems = state.items.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + action.item.amount }
            : item
        );
      } else {
        updatedItems = [...state.items, action.item];
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    case "REMOVE":
      const item = state.items.find((item) => item.id === action.id);
      if (state.items.filter((item) => item.id === action.id)[0].amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        updatedItems = state.items.map((item) =>
          item.id === action.id ? { ...item, amount: --item.amount } : item
        );
      }

      return {
        items: updatedItems,
        totalAmount: Math.abs(state.totalAmount - item.price),
      };
    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
