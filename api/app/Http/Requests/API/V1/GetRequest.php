<?php

namespace App\Http\Requests\API\V1;

/**
 * @property int        $id
 */
final class GetRequest extends APIRequest
{
    public function rules(): array
    {
        return [
            'id'   => ['required', 'integer'],
        ];
    }

    public function authorize(): bool
    {
        $this->merge([
            'id' => $this->route('id'),
        ]);

        return true;
    }
}
