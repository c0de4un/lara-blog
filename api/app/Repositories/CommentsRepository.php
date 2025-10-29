<?php

namespace App\Repositories;

use App\Models\Comment;

final class CommentsRepository
{
    public function create(Comment $comment): bool
    {
        assert($comment->article_id > 0, 'article_id is required');
        assert(!empty($comment->content), 'content is required');

        $comment->created_at = now();

        return $comment->save();
    }
}
