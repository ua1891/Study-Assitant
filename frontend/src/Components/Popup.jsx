
import styles from "../styles/Popup.module.css";

function Popup({
  show,
  title,
  message,
  type = "info",
  onClose,
}) {
  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.popup} ${styles[type]}`}>
        <h2>{title}</h2>

        <p>{message}</p>

        <button onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default Popup;