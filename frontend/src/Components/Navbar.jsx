import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../styles/Navbar.module.css";
import { GraduationCap, Home, BookOpen } from "lucide-react";

function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link to="/" className={styles.navbarLogo}>
        <GraduationCap size={26} />
        Study Assistant
      </Link>
      <ul className={styles.navbarLinks}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? styles.activeLink : ""}
          >
            <Home size={16} />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/notes"
            className={location.pathname === "/notes" ? styles.activeLink : ""}
          >
            <BookOpen size={16} />
            Notes
          </Link>
        </li>
      </ul>
    </motion.nav>
  );
}

export default Navbar;