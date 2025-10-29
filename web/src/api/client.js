const API_BASE_URL = 'http://localhost/api';

// Функция для выполнения GET-запросов
async function get(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Функция для выполнения POST-запросов с JSON данными
async function postJSON(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Функция для выполнения POST-запросов с form data
async function postFormData(endpoint, data) {
  const formData = new FormData();
  
  // Добавляем все поля в FormData
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    // Не устанавливаем Content-Type заголовок, браузер сам установит правильный с boundary
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Функция для выполнения POST-запросов (по умолчанию используем form data для совместимости с API)
async function post(endpoint, data) {
  return postFormData(endpoint, data);
}

// Функции для работы со статьями
export const articles = {
  // Получить список статей
  list: () => get('/articles'),
  
  // Получить статью по ID
  get: (id) => get(`/articles/${id}`),
  
  // Создать новую статью
  create: (articleData) => post('/articles', articleData),
};

// Функции для работы с комментариями
export const comments = {
  // Создать новый комментарий
  create: (articleId, commentData) => post(`/articles/${articleId}/comments`, commentData),
};

// Экспортируем базовый клиент для возможного расширения
export default {
  get,
  post,
  postJSON,
  postFormData,
  articles,
  comments,
};