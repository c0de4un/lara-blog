<?php

namespace App\Http\Controllers\API\V1\Comments;

use Throwable;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Models\Comment;
use App\Repositories\CommentsRepository;
use App\Http\Resources\API\V1\CommentResource;
use App\Http\Requests\API\V1\Comments\CreateCommentRequest;

final class CreateCommentAction
{
    public function __invoke(CreateCommentRequest $request): JsonResponse
    {
        $comment = new Comment();
        $comment->fill($request->validated());

        /** @var CommentsRepository $repo */
        $repo = app(CommentsRepository::class);

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
            $created = $repo->create($comment);
        } catch (Throwable $e) {
            Log::error('failed to create comment: '
                . PHP_EOL . 'ERROR:  . ' . $e->getMessage()
                . PHP_EOL . 'TRACE:  . ' . $e->getTraceAsString()
            );

            try {
                DB::rollBack();
            } catch (Throwable $e) {
                Log::warning('failed to rollback transaction: '
                    . PHP_EOL . 'ERROR: ' . $e->getMessage()
                    . PHP_EOL . 'TRACE: ' . $e->getTraceAsString()
                );
            }

            return response()->json([
                'message' => 'error, try again later',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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

        if (!$created) {
            return response()->json([
                'message' => 'error, try again later',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(new CommentResource($comment));
    }
}
