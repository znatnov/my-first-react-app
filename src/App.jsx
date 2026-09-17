import { useState } from 'react';
import { Header } from './components/Header/Header';
import { ArticleList } from './components/ArticleList/ArticleList';
import { Search } from './components/Search/Search';
import { AddArticleForm } from './components/AddArticleForm/AddArticleForm';
import { articles as initialArticles } from './data/articles';

function App() {
  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  
  const tags = Array.from(new Set(initialArticles.map((article) => article.tag)));

  
  const handleAddArticle = (newArticle) => {
    setArticles([newArticle, ...articles]);
  };

 
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || article.tag === selectedTag;

    return matchesSearch && matchesTag;
  });

  return (
    <div>
      <Header />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        tags={tags}
      />
      <AddArticleForm onAddArticle={handleAddArticle} />
      <ArticleList articles={filteredArticles} />
    </div>
  );
}

export default App;