import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);

  const [btnBump, setBtnBump] = useState(false);

  const numberOfCartItems = ctx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ""}`;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setBtnBump(true);

    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [ctx.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
