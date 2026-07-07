import styles from "/src/styles/search.module.css";

function Search() {
  return (
    <div className={styles.searchbox}>
      <input type="text" placeholder="Search..." className={styles.searchInput} />
    </div>
  );
}

export default Search;