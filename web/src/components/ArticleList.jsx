import { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

function ArticleList({ articles, onAddComment }) {
  const [openComments, setOpenComments] = useState({});
  const [showCommentForm, setShowCommentForm] = useState({});
  const [commentLoading, setCommentLoading] = useState({});

  const toggleComments = (articleId) => {
    setOpenComments(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  const toggleCommentForm = (articleId) => {
    setShowCommentForm(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  const handleAddComment = async (articleId, commentData) => {
    try {
      setCommentLoading(prev => ({ ...prev, [articleId]: true }));
      await onAddComment(articleId, commentData);
      
      // Скрываем форму после успешного добавления
      setShowCommentForm(prev => ({ ...prev, [articleId]: false }));
    } finally {
      setCommentLoading(prev => ({ ...prev, [articleId]: false }));
    }
  };

  // Убедимся, что у статьи есть массив комментариев
  const articlesWithComments = articles.map(article => ({
    ...article,
    comments: article.comments || []
  }));

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {articlesWithComments.map((article) => (
          <li key={article.id} className="border-b border-gray-200 last:border-b-0">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="text-sm text-gray-500">
                  {article.content.substring(0, 150)}...
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <span>{article.created_at}</span>
                </div>
              </div>
              
              {/* Кнопки для управления комментариями */}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => toggleComments(article.id)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  {openComments[article.id] ? 'Скрыть комментарии' : 'Показать комментарии'} ({article.comments.length})
                </button>
                <button
                  onClick={() => toggleCommentForm(article.id)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  Добавить комментарий
                </button>
              </div>
              
              {/* Аккордеон с комментариями */}
              {openComments[article.id] && (
                <div className="mt-4">
                  <CommentList comments={article.comments} />
                </div>
              )}
              
              {/* Форма добавления комментария */}
              {showCommentForm[article.id] && (
                <div className="mt-4">
                  <CommentForm
                    onSubmit={(commentData) => handleAddComment(article.id, commentData)}
                    loading={commentLoading[article.id] || false}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;