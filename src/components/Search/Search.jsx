import styles from './Search.module.css';

export function Search({ searchTerm, setSearchTerm, selectedTag, setSelectedTag, tags }) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Поиск по названию или тексту..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
      />
      <div className={styles.tagsContainer}>
        <button
          className={`${styles.tagBtn} ${selectedTag === '' ? styles.active : ''}`}
          onClick={() => setSelectedTag('')}
        >
          Все
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`${styles.tagBtn} ${selectedTag === tag ? styles.active : ''}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}