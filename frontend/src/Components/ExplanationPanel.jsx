import React from "react";
import {useState} from "react";
import styles from "../styles/ExplanationPanel.module.css";

function ExplanationPanel({ explanation }) {
    const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={styles.panel}>
        <button className={styles.toggleBtn} onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'Hide details' : 'Show details'}
        </button>
        {isVisible && <p className={styles.explanationText}>{explanation}</p>}
    </div>

  );
}

export default ExplanationPanel;