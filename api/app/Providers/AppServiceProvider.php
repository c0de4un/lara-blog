<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\Application;
use App\Repositories\ArticlesRepository;
use App\Repositories\CommentsRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(ArticlesRepository::class, function(Application $app) {
            return new ArticlesRepository();
        });
        $this->app->bind(CommentsRepository::class, function(Application $app) {
            return new CommentsRepository();
        });
    }
}
