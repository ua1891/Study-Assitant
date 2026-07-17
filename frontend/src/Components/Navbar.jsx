import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../styles/Navbar.module.css";
import { GraduationCap } from "lucide-react";

function Navbar() {
  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.navbarLogo}>
        <GraduationCap size={28} style={{ color: "var(--primary)" }} />
        Study Assistant
      </div>
      <ul className={styles.navbarLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
    </motion.nav>
  );
}

export default Navbar;