<?php

namespace App\Repositories;

use RuntimeException;
use App\Models\Article;
use App\DTO\ListRepositoryResult;
use App\DTO\ListRepositoryRequest;

final class ArticlesRepository
{
    const DEFAULT_LIMIT = 15;

    public function create(Article $article): bool
    {
        assert(!empty($article->title), 'title is required');
        assert(!empty($article->content), 'content is required');

        $article->created_at = now();

        return $article->save();
    }

    public function getArticles(ListRepositoryRequest $request): ListRepositoryResult
    {
        assert($request->limit > 0, 'check logic, limit must be greater than 0');
        assert($request->offset > -1, 'check logic, offset must be greater than -1');

        $query = Article::query();

        $count = $query->count();

        $items = $query
            ->with(['comments'])
            ->limit($request->limit)
            ->offset($request->offset)
            ->get();

        return new ListRepositoryResult($request->offset, $count, $request->limit, $items);
    }

    public function getArticle(int $id): ?Article
    {
        return Article::query()
            ->with(['comments'])
            ->where('id', $id)
            ->limit(1)
            ->first();
    }
}
