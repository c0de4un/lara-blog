<?php

namespace App\DTO;

use Illuminate\Database\Eloquent\Collection;

final readonly class ListRepositoryResult
{
    public int $offset;
    public int $total;
    public int $limit;
    public Collection $items;

    public function __construct(int $offset, int $total, int $limit, Collection $items)
    {
        $this->offset = $offset;
        $this->total = $total;
        $this->limit = $limit;
        $this->items = $items;
    }
}

