<?php

namespace App\Http\Controllers\API\V1\Articles;

use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\API\V1\GetRequest;
use App\Http\Resources\API\V1\ArticleResource;
use App\Repositories\ArticlesRepository;

final class GetArticleAction
{
    public function __invoke(GetRequest $request): JsonResponse
    {
        /** @var ArticlesRepository $repo */
        $repo = app(ArticlesRepository::class);

        $article = $repo->getArticle($request->id);
        if (!$article) {
            return response()->json([
                'message' => 'Article not found'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json(new ArticleResource(
            $article
        ));
    }
}
