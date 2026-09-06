import { ArticleCard } from '../ArticleCard/ArticleCard';
import { articles } from '../../data/articles';
import styles from './ArticleList.module.css';

export function ArticleList() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Последние статьи</h2>
        <div className={styles.grid}>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}