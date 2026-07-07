import Search from "./Search";
import styles from "/src/styles/Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.h1}>Study Assistant</h1>
              <p className={styles.p}>Learn Smarter with AI</p>
                <Search />
        </header>
    );
}

export default Header;