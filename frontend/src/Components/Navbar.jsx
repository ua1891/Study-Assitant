import { Link } from "react-router-dom";
import styles from "/src/styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>Study Assistant</div>
      <ul className={styles.navbarLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;