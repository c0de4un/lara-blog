<?php

namespace App\Http\Requests\API\V1\Comments;

use App\Http\Requests\API\V1\APIRequest;

/**
 * @property string        $title
 * @property string        $content
 * @property string        $author_name
 * @property int           $article_id
 */
final class CreateCommentRequest extends APIRequest
{
    public function rules(): array
    {
        return [
            'title'        => ['required', 'string', 'min:3,max:255'],
            'content'      => ['required', 'string', 'min:3'],
            'author_name'  => ['required', 'string', 'min:3,max:255'],
            'article_id'   => ['required', 'integer', 'min:1', 'exists:articles,id'],
        ];
    }

    public function authorize(): bool
    {
        $this->merge([
            'article_id' => $this->route('id'),
        ]);

        return true;
    }
}
