<?php

namespace App\Models;

use Eloquent;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;


/**
 * @property int           $id
 * @property string        $title
 * @property string        $content
 * @property Carbon|null   $created_at
 * @property Collection    $comments
 * @method static Builder<static>|Article newModelQuery()
 * @method static Builder<static>|Article newQuery()
 * @method static Builder<static>|Article query()
 * @method static Builder<static>|Article whereUpdatedAt($value)
 * @mixin Eloquent
 */
final class Article extends Model
{
    public $table = 'articles';
    public $timestamps = false;

    protected $fillable = [
        'title',
        'content',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * Получить комментарии, связанные со статьей.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
