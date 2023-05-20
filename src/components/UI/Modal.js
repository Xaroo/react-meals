import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={classes.modal}>{props.children}</div>,
        portalElement
      )}
      {ReactDOM.createPortal(
        <div className={classes.blur} onClick={props.onClick}></div>,
        portalElement
      )}
    </>
  );
};
export default Modal;
