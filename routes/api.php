<?php

use App\Http\Controllers\Api\RegisterCodeApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {
    Route::get('/code', [RegisterCodeApiController::class, 'index']);
});
