import { useState } from 'react';
import { Header } from './components/header/header';
import { ArticleList } from './components/ArticleList/ArticleList';
import { Search } from './components/Search/Search';
import { AddArticleForm } from './components/AddArticleForm/AddArticleForm';
import { articles as initialArticles } from './data/articles';

export function App() {
  const [articles, setArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Получаем список уникальных тегов для выпадающего списка
  const allTags = Array.from(
    new Set(articles.map((article) => article.tag).filter(Boolean))
  );

  // Добавление новой статьи
  const handleAddArticle = (newArticle) => {
    setArticles((prev) => [newArticle, ...prev]);
  };

  // Фильтрация статей
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
        <Search
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          tags={allTags}
        />

        <AddArticleForm onAddArticle={handleAddArticle} />

        <ArticleList articles={filteredArticles} />
      </main>
    </div>
  );
}

export default App;