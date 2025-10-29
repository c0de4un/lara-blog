# Архитектура фронтенда блога

## Структура компонентов и страниц

```mermaid
graph TD
    A[App.jsx - Основной компонент] --> B[Навигация/Меню]
    A --> C[Маршрутизация]
    
    C --> D[Страница списка статей]
    C --> E[Страница отдельной статьи]
    C --> F[Форма создания статьи]
    
    D --> G[Компонент списка статей]
    E --> H[Компонент статьи]
    E --> I[Компонент списка комментариев]
    E --> J[Форма добавления комментария]
    
    H --> K[Отображение содержимого статьи]
    I --> L[Отображение отдельного комментария]
```

## Взаимодействие с API

```mermaid
graph LR
    A[Фронтенд] --> B[API-клиент]
    B --> C[HTTP-запросы]
    C --> D[Бэкенд API]
    
    D --> E[Маршруты статей]
    D --> F[Маршруты комментариев]
    
    E --> G[Список статей]
    E --> H[Получение статьи]
    E --> I[Создание статьи]
    
    F --> J[Создание комментария]
```

## Структура данных

### Статья (Article)
- id: number
- title: string
- content: string
- created_at: string (формат: Y-m-d H:i:s)
- comments: Comment[]

### Комментарий (Comment)
- id: number
- article_id: number
- author_name: string
- content: string
- created_at: string

## Файловая структура

```
web/src/
├── components/
│   ├── ArticleList.jsx
│   ├── Article.jsx
│   ├── CommentList.jsx
│   ├── Comment.jsx
│   ├── Navigation.jsx
│   ├── ArticleForm.jsx
│   └── CommentForm.jsx
├── pages/
│   ├── ArticleListPage.jsx
│   ├── ArticlePage.jsx
│   └── CreateArticlePage.jsx
├── api/
│   └── client.js
├── App.jsx
├── main.jsx
├── index.css
└── App.css