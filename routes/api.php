<?php

use App\Http\Controllers\Api\RegisterCodeApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AttendanceApiController;
use App\Http\Controllers\Api\CompetitionApiController;
use App\Http\Controllers\Api\LeaderBoardApiController;
use App\Http\Controllers\Api\UsersApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {
    Route::get('/code', [RegisterCodeApiController::class, 'index']);
});

Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {
    Route::get('/attendance', [AttendanceApiController::class, 'index']);
});

Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users', [UsersApiController::class, 'index']);
});

Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {
    Route::get('/leaderboard', [LeaderBoardApiController::class, 'index']);
});

Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {
    Route::get('/competition', [CompetitionApiController::class, 'index']);
});