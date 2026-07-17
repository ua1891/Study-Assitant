import React from "react";
import {useState} from "react";
import styles from "../styles/ExplanationPanel.module.css";

function ExplanationPanel({ explanation, children }) {
    const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={styles.panel}>
        <button className={styles.toggleBtn} onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'Hide details' : 'Show details'}
        </button>
        {isVisible && (
          <div className={styles.content}>
            <p className={styles.explanationText}>{explanation}</p>
            {children}
          </div>
        )}
    </div>
  );
}

export default ExplanationPanel;