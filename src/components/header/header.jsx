import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>DevBlog</h1>
        <nav>
          <ul className={styles.navList}>
            <li><a href="#articles" className={styles.navLink}>Статьи</a></li>
            <li><a href="#about" className={styles.navLink}>О блоге</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}