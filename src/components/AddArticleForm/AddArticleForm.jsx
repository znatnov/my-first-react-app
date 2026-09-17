import { useState } from 'react';
import styles from './AddArticleForm.module.css';

export function AddArticleForm({ onAddArticle }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tag, setTag] = useState('React');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim()) return;

    const newArticle = {
      id: Date.now(),
      title,
      excerpt,
      author: 'Владислав Знатнов',
      date: new Date().toISOString().split('T')[0],
      tag,
      image: `https://picsum.photos/seed/${Date.now()}/400/220`,
    };

    onAddArticle(newArticle);
    setTitle('');
    setExcerpt('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Добавить новую статью</h3>
      <div className={styles.field}>
        <label>Заголовок:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Краткое описание:</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <label>Тег:</label>
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="React">React</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="HTML">HTML</option>
          <option value="3D & Graphics">3D & Graphics</option>
        </select>
      </div>
      <button type="submit" className={styles.submitBtn}>
        Опубликовать
      </button>
    </form>
  );
}