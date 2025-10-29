import { useState } from 'react';

function CommentForm({ onSubmit, loading }) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!authorName.trim()) {
      newErrors.authorName = 'Имя автора обязательно для заполнения';
    } else if (authorName.trim().length < 2) {
      newErrors.authorName = 'Имя автора должно содержать не менее 2 символов';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Комментарий обязателен для заполнения';
    } else if (content.trim().length < 5) {
      newErrors.content = 'Комментарий должен содержать не менее 5 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        author_name: authorName,
        content: content,
        title: 'Comment' // Добавляем обязательное поле title для совместимости с API
      });
      
      // Очистка формы после успешной отправки
      setAuthorName('');
      setContent('');
      setErrors({});
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Добавить комментарий</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            Комментарий
          </label>
          <div className="mt-1">
            <textarea
              id="content"
              rows={4}
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

        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;