import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ArticleForm({ onSubmit, loading }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Заголовок обязателен для заполнения';
    } else if (title.trim().length < 5) {
      newErrors.title = 'Заголовок должен содержать не менее 5 символов';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Содержание обязательно для заполнения';
    } else if (content.trim().length < 20) {
      newErrors.content = 'Содержание должно содержать не менее 20 символов';
    }
    
    if (!authorName.trim()) {
      newErrors.authorName = 'Имя автора обязательно для заполнения';
    } else if (authorName.trim().length < 2) {
      newErrors.authorName = 'Имя автора должно содержать не менее 2 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        title: title,
        content: content,
        author_name: authorName
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Создать новую статью</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Заголовок
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border rounded-md ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                required
                disabled={loading}
              />
              {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700">
              Ваше имя
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="author_name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className={`py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border rounded-md ${
                  errors.authorName ? 'border-red-300' : 'border-gray-300'
                }`}
                required
                disabled={loading}
              />
              {errors.authorName && <p className="mt-2 text-sm text-red-600">{errors.authorName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Содержание
            </label>
            <div className="mt-1">
              <textarea
                id="content"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border rounded-md ${
                  errors.content ? 'border-red-300' : 'border-gray-300'
                }`}
                required
                disabled={loading}
              />
              {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/articles')}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Создание...' : 'Создать статью'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleForm;