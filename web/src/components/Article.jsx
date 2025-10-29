function Article({ article }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Опубликовано: {article.created_at}
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:px-6">
          <div className="text-gray-700 whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;