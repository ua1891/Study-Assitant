import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "../styles/ExplanationPanel.module.css";

function ExplanationPanel({ explanation, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.panel}>
      <button className={styles.toggleBtn} onClick={() => setIsVisible(!isVisible)}>
        <span>{isVisible ? 'Hide details' : 'Show details'}</span>
        <motion.div
          animate={{ rotate: isVisible ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={styles.contentWrapper}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.content}>
              <p className={styles.explanationText}>{explanation}</p>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ExplanationPanel;