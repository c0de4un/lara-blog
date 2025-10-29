<?php

namespace App\Http\Requests\API\V1;

/**
 * @property int|null        $offset
 * @property int|null        $limit
 */
final class ListRequest extends APIRequest
{
    public function rules(): array
    {
        return [
            'offset' => 'nullable|integer|min:0',
            'limit' => 'nullable|integer|min:1',
        ];
    }
}
