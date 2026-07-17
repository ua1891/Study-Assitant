import { motion } from "framer-motion";
import Search from "./Search";
import styles from "/src/styles/Header.module.css";

function Header({ searchQuery, onSearchChange }) {
  return (
    <header className={styles.header}>
      {/* Decorative orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <motion.h1
        className={styles.h1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Study Assistant
      </motion.h1>
      <motion.p
        className={styles.p}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        Your AI-powered study companion — organize courses, summarize notes, and master your subjects faster.
      </motion.p>

      {searchQuery !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
        </motion.div>
      )}
    </header>
  );
}

export default Header;