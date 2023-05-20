import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = ctx.items.map((item) => (
    <CartItem
      key={item.id}
      price={item.price}
      amount={item.amount}
      name={item.name}
      onAdd={() => cartItemAddHandler(item)}
      onRemove={() => cartItemRemoveHandler(item.id)}
    ></CartItem>
  ));

  return (
    <Modal onClick={props.hideCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.hideCart}>
          Close
        </button>
        {ctx.items.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
