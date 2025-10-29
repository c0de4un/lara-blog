import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../components/ArticleForm';
import api from '../api/client';

function CreateArticlePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateArticle = async (articleData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.articles.create(articleData);
      
      // Если статья успешно создана, перенаправляем на страницу списка статей
      // Предполагаем, что API возвращает объект с полем data или данные напрямую
      const newArticle = response.data || response;
      console.log('Статья создана:', newArticle);
      
      // Перенаправляем на страницу списка статей
      navigate('/articles');
    } catch (err) {
      console.error('Ошибка при создании статьи:', err);
      setError('Не удалось создать статью. Пожалуйста, попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ArticleForm onSubmit={handleCreateArticle} loading={loading} />
    </div>
  );
}

export default CreateArticlePage;