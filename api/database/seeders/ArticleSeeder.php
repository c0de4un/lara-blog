<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

final class ArticleSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // IT статья
        Article::create([
            'title' => 'Искусственный интеллект: будущее или фантастика?',
            'content' => 'В современном мире искусственный интеллект (ИИ) играет все более важную роль. Он используется в различных сферах, от медицины до транспорта. В данной статье мы рассмотрим текущие достижения ИИ и его возможное влияние на будущее.',
            'created_at' => Carbon::now()->subDays(3),
        ]);

        // Психология статья
        Article::create([
            'title' => 'Как стресс влияет на психику человека?',
            'content' => 'Стресс — это естественная реакция организма на угрозу. Однако при длительном воздействии он может привести к серьезным последствиям для психического здоровья. В этой статье мы поговорим о том, как справляться со стрессом и сохранять психологическое равновесие.',
            'created_at' => Carbon::now()->subDays(2),
        ]);

        // Экономика статья
        Article::create([
            'title' => 'Цифровая экономика: тенденции и вызовы',
            'content' => 'Цифровизация экономики меняет рынки, способы работы и потребления. В этой статье рассматриваются ключевые тенденции цифровой экономики, а также вызовы, связанные с переходом к новым технологическим решениям.',
            'created_at' => Carbon::now()->subDays(1),
        ]);
    }
}
