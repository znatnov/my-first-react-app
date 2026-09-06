import styles from './ArticleCard.module.css';

export function ArticleCard({ article }) {
  const { title, excerpt, author, date, tag, image } = article;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.tag}>{tag}</span>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.excerpt}>{excerpt}</p>
        <div className={styles.footer}>
          <span className={styles.author}>{author}</span>
          <time className={styles.date}>{date}</time>
        </div>
      </div>
    </article>
  );
}