import styles from "../styles/CourseCard.module.css";
import ExplanationPanel from "./ExplanationPanel";  
import { useState } from "react";


function CourseCard({ id, title, description, duration, rating, onRemove }) {
    const [interested, setInterested] = useState(0);
    return (

        <div className={styles.card}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.meta}>
                <span className={styles.duration}>Duration: {duration}</span>
                <span className={styles.rating}>Rating: {rating}</span>
            </div>


               <ExplanationPanel explanation={description} />{/*Conditionally render the description*/}
            <div className={styles.actions}>
                <button className={styles.btnInterested} onClick={() => setInterested((prev) => prev + 1)}>
                     Interested ({interested})
                </button>
                <button className={styles.btnRemove} onClick={() => onRemove(id)}>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CourseCard;