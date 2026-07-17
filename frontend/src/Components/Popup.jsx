import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import styles from "../styles/Popup.module.css";

function Popup({
  show,
  title,
  message,
  type = "info",
  onClose,
  onConfirm,
}) {
  const icons = {
    success: <CheckCircle2 size={32} className={styles.iconSuccess} />,
    error: <XCircle size={32} className={styles.iconError} />,
    warning: <AlertTriangle size={32} className={styles.iconWarning} />,
    info: <Info size={32} className={styles.iconInfo} />,
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`${styles.popup} ${styles[type]}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={styles.iconWrapper}>
              {icons[type]}
            </div>
            
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.message}>{message}</p>
            
            <div className={styles.actions}>
              {onConfirm ? (
                <>
                  <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                  <button className={`${styles.confirmBtn} ${styles[type + "Btn"]}`} onClick={onConfirm}>
                    Yes, Confirm
                  </button>
                </>
              ) : (
                <button className={`${styles.okBtn} ${styles[type + "Btn"]}`} onClick={onClose}>
                  Got it
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Popup;