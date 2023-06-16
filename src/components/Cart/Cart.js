import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setShowForm(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-meals-eca13-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItem: ctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setShowForm(false);
    setDidSubmit(true);

    ctx.clearOrder();
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.hideCart}>
        Close
      </button>
      {ctx.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showForm && (
        <Checkout onClose={props.hideCart} submitOrder={submitOrderHandler} />
      )}
      {!showForm && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order!</p>;

  const didSubmitModalContent = (
    <>
      <p>Your order has been received!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.hideCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.hideCart}>
      {!didSubmit && !isSubmitting && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && !isSubmitting && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
