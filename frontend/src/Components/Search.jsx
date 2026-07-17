import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import styles from "/src/styles/search.module.css";

function Search({ searchQuery, onSearchChange }) {
  const [inputValue, setInputValue] = useState(searchQuery);

  // Sync input when parent resets searchQuery (e.g. "not found" popup close)
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  function handleSearch() {
    onSearchChange(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className={styles.searchbox}>
      <SearchIcon size={18} className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search courses..."
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.searchBtn}
        onClick={handleSearch}
        aria-label="Search"
        type="button"
      >
        Search
      </button>
    </div>
  );
}

export default Search;