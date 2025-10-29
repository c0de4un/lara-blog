<?php

namespace App\Http\Requests\API\V1\Articles;

use App\Http\Requests\API\V1\APIRequest;

/**
 * @property string        $title
 * @property string        $content
 * @property string        $author_name
 */
final class CreateArticleRequest extends APIRequest
{
    public function rules(): array
    {
        return [
            'title'        => 'required|string|min:3,max:255',
            'content'      => 'required|string',
            'author_name'  => 'required|string|min:3,max:255',
        ];
    }
}
