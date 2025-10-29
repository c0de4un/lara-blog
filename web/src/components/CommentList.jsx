function CommentList({ comments }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Комментарии</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">Пока нет комментариев. Будьте первым!</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <li key={comment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-medium text-gray-900">{comment.author_name}</h3>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="text-sm text-gray-500">
                      {comment.content}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <span>{comment.created_at}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CommentList;