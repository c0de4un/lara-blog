import { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import api from '../api/client';

function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await api.articles.list();
      // Если API возвращает объект с полем data, используем его
      // В противном случае используем данные напрямую
      setArticles(data.list || data);
      setError(null);
    } catch (err) {
      console.error('Ошибка при получении списка статей:', err);
      setError('Не удалось загрузить список статей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAddComment = async (articleId, commentData) => {
    try {
      const newComment = await api.comments.create(articleId, commentData);
      // Обновляем статью с новым комментарием
      setArticles(prevArticles => {
        return prevArticles.map(article => {
          if (article.id === articleId) {
            return {
              ...article,
              comments: [...(article.comments || []), newComment]
            };
          }
          return article;
        });
      });
    } catch (err) {
      console.error('Ошибка при добавлении комментария:', err);
      throw err; // Пробрасываем ошибку, чтобы обработать её в форме
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Список статей</h1>
          <div>Загрузка...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Список статей</h1>
          <div className="text-red-500">{error}</div>
          <button
            onClick={fetchArticles}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Повторить попытку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Список статей</h1>
        <ArticleList articles={articles} onAddComment={handleAddComment} />
      </div>
    </div>
  );
}

export default ArticleListPage;