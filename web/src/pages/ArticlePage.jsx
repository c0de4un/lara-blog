import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../components/Article';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import api from '../api/client';

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await api.articles.get(id);
        // Если API возвращает объект с полем data, используем его
        // В противном случае используем данные напрямую
        setArticle(data.data || data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при получении статьи:', err);
        setError('Не удалось загрузить статью');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleAddComment = async (commentData) => {
    try {
      const newComment = await api.comments.create(id, commentData);
      // Обновляем статью с новым комментарием
      setArticle(prevArticle => {
        // Если API возвращает объект с полем data, используем его
        // В противном случае используем данные напрямую
        const comment = newComment.data || newComment;
        
        return {
          ...prevArticle,
          comments: [...(prevArticle.comments || []), comment]
        };
      });
    } catch (err) {
      console.error('Ошибка при добавлении комментария:', err);
      // Здесь можно добавить уведомление об ошибке для пользователя
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div>Загрузка статьи...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div>Статья не найдена</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <Article article={article} />
        <CommentList comments={article.comments || []} />
        <CommentForm onSubmit={handleAddComment} />
      </div>
    </div>
  );
}

export default ArticlePage;