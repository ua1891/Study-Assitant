import styles from "/src/styles/Footer.module.css";
import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.brand}>Study Assistant</span>
        <span className={styles.separator}>•</span>
        <span className={styles.tagline}>
          Built with <Heart size={14} className={styles.heart} /> for students
        </span>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;