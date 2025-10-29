<?php

namespace App\Http\Controllers\API\V1\Articles;

use Throwable;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\DTO\ListRepositoryRequest;
use App\Repositories\ArticlesRepository;
use App\Http\Requests\API\V1\ListRequest;
use App\Http\Resources\API\V1\ArticleResource;

final class ListArticlesAction
{
    public function __invoke(ListRequest $request): JsonResponse
    {
        /** @var ArticlesRepository $repo */
        $repo = app(ArticlesRepository::class);

        try {
            $paginatedInfo = $repo->getArticles(new ListRepositoryRequest(
                $request->integer('offset'),
                $request->integer('limit', ArticlesRepository::DEFAULT_LIMIT),
            ));
        } catch (Throwable $e) {
            Log::error('failed to paginate articles: '
                . PHP_EOL . 'ERROR: ' . $e->getMessage()
                . PHP_EOL . 'TRACE: ' . $e->getTraceAsString()
            );
            return response()->json([
                'message' => 'unexpected error, try again later',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json([
            'total'  => $paginatedInfo->total,
            'limit'  => $paginatedInfo->limit,
            'offset' => $paginatedInfo->offset,
            'list'   => ArticleResource::collection($paginatedInfo->items),
        ]);
    }
}
