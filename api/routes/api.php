<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\Articles\CreateArticleAction;
use App\Http\Controllers\API\V1\Articles\ListArticlesAction;
use App\Http\Controllers\API\V1\Articles\GetArticleAction;
use App\Http\Controllers\API\V1\Comments\CreateCommentAction;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('/articles')->group(function () {
    Route::get('/', ListArticlesAction::class);
    Route::post('/', CreateArticleAction::class);

    Route::prefix('/{id}')->group(function () {
        Route::get('/', GetArticleAction::class);

        Route::prefix('/comments')->group(function () {
            Route::post('/', CreateCommentAction::class);
        });
    });
});
