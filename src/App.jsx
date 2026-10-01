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
      {/* Стили для CSS Grid (Задания 1, 2 и 4) */}
      <style>{`
        .lab2-layout {
          display: grid;
          grid-template-columns: 200px 1fr 200px;
          grid-template-areas:
            "header header header"
            "main sidebar ."
            "footer footer footer";
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px;
        }

        @media (max-width: 768px) {
          .lab2-layout {
            grid-template-columns: 1fr;
            grid-template-areas:
              "header"
              "main"
              "sidebar"
              "footer";
          }
        }
      `}</style>

      <Header articlesCount={articles.length} />

      <main className="lab2-layout">
        <div style={{ gridArea: 'main' }}>
          {/* Задание 3: Новый контент через children */}
          <section style={{ marginBottom: '2rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
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
        </div>
      </main>
    </div>
  );
}

export default App;