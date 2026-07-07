import styles from "../styles/CourseCard.module.css";

function CourseCard({ title, description, duration, rating }) {
  return (
       console.log(title),
    <div className={styles.card}>
      <h1 className={styles.title}>{title}</h1>

      <p className={styles.description}>{description}</p>
      <div className={styles.meta}>
        <span className={styles.duration}>
          Duration: {duration}
        </span>

        <span className={styles.rating}>
          Rating: {rating}
        </span>
      </div>
    </div>
  );
}

export default CourseCard;