import { ArticleCard } from '../ArticleCard/ArticleCard';
import styles from './ArticleList.module.css';

export function ArticleList({ articles }) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Последние статьи</h2>
        {articles.length === 0 ? (
          <p>Статьи не найдены.</p>
        ) : (
          <div className={styles.grid}>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}