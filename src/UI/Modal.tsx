import Button from "./Button";
import classes from "./Modal.module.scss";

const Modal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = (
  props
) => {
  return (
    <div className={classes.modal}>
      <div className={classes.overlay} onClick={props.onCancel} />
      <div className={classes.content}>
        <div className={classes.submit}>
          <Button onClick={props.onConfirm}>Confirm</Button>
          <Button onClick={props.onCancel}>Cancel</Button>
        </div>
        <div className={classes.body}><p>{props.children}</p></div>
      </div>
    </div>
  );
};

export default Modal;
