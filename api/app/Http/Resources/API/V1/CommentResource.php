<?php

namespace App\Http\Resources\API\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/*
 * @extends JsonResource<Comment>
 * @mixin Comment
 */
final class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'            => $this->id,
            'article_id'    => $this->article_id,
            'author_name'   => $this->author_name,
            'content'       => $this->created_at->format('Y-m-d H:i:s'),
            'created_at'    => $this->created_at,
        ];
    }
}
