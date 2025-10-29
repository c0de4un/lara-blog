<?php

namespace App\Http\Controllers\API\V1\Articles;

use Throwable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Models\Article;
use App\Http\Requests\API\V1\Articles\CreateArticleRequest;
use App\Repositories\ArticlesRepository;
use App\Http\Resources\API\V1\ArticleResource;

final class CreateArticleAction
{
    public function __invoke(CreateArticleRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
        } catch (Throwable $e) {
            Log::error('failed to start transaction: '
                . PHP_EOL . 'ERROR: ' . $e->getMessage()
                . PHP_EOL . 'TRACE: ' . $e->getTraceAsString()
            );

            return response()->json([
                'message' => 'Database error. Please try again later.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        try {
            /** @var ArticlesRepository $articlesRepo */
            $articlesRepo = App::make(ArticlesRepository::class);
        } catch (Throwable $e) {
            Log::error('failed to get articles repository: '
                . PHP_EOL . 'ERROR: ' . $e->getMessage()
                . PHP_EOL . 'TRACE: ' . $e->getTraceAsString()
            );

            return response()->json([
                'message' => 'Database error. Please try again later.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $article = new Article();
        $article->fill($request->validated());

        try {
            if (!$articlesRepo->create($article)) {
                return response()->json([
                    'message' => 'Database error. Please try again later.',
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (Throwable $e) {
            Log::error('failed to create article: '
                . PHP_EOL . 'ERROR: ' . $e->getMessage()
                . PHP_EOL . 'TRACE: ' . $e->getTraceAsString()
            );

            try {
                DB::rollBack();
            } catch (Throwable $e) {
                Log::warning('failed to rollback transaction: '
                    . PHP_EOL . 'ERROR: ' . $e->getMessage()
                    . PHP_EOL . 'TRACE: ' . $e->getTraceAsString()
                );
            }
        }

        try {
            DB::commit();
        } catch (Throwable $e) {
            Log::error('failed to commit transaction: '
                . PHP_EOL . 'ERROR: ' . $e->getMessage()
                . PHP_EOL . 'TRACE: ' . $e->getTraceAsString()
            );

            return response()->json([
                'message' => 'Database error. Please try again later.',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(new ArticleResource($article), Response::HTTP_CREATED);
    }
}
