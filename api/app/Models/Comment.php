<?php

namespace App\Models;

use Eloquent;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int          $id
 * @property int          $article_id
 * @property string       $author_name
 * @property string       $content
 * @property Carbon|null  $created_at
 * @property Article      $article
 * @method static Builder<static>|Comment newModelQuery()
 * @method static Builder<static>|Comment newQuery()
 * @method static Builder<static>|Comment query()
 * @method static Builder<static>|Comment whereArticleId($value)
 * @method static Builder<static>|Comment whereAuthorName($value)
 * @method static Builder<static>|Comment whereContent($value)
 * @method static Builder<static>|Comment whereCreatedAt($value)
 * @mixin Eloquent
 */
final class Comment extends Model
{
    public $table = 'comments';
    public $timestamps = false;

    protected $fillable = [
        'article_id',
        'author_name',
        'content',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    /**
     * Получить статью, к которой относится комментарий.
     */
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }
}
