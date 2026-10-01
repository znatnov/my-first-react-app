import { useState } from 'react';
import { Header } from './components/header/header';
import { ArticleList } from './components/ArticleList/ArticleList';
import { Search } from './components/Search/Search';
import { AddArticleForm } from './components/AddArticleForm/AddArticleForm';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import { articles as initialArticles } from './data/articles';

export function App() {
  const [articles, setArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const allTags = Array.from(
    new Set(articles.map((article) => article.tag).filter(Boolean))
  );

  const handleAddArticle = (newArticle) => {
    setArticles((prev) => [newArticle, ...prev]);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag ? article.tag === selectedTag : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div>
      <Header articlesCount={articles.length} />

      <main style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section style={{ marginBottom: '2rem', background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
          <h2>Добро пожаловать в блог!</h2>
          <p>Используйте поиск и фильтры ниже для навигации по статьям.</p>
        </section>

        <Search
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          tags={allTags}
        />

        <AddArticleForm onAddArticle={handleAddArticle} />

        <ArticleList articles={filteredArticles} />

        {/* Лабораторная работа №3 */}
        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ textAlign: 'center' }}>Обратная связь</h2>
          <FeedbackForm />
        </section>
      </main>
    </div>
  );
}

export default App;