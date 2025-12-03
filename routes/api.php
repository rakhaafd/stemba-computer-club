<?php

use App\Http\Controllers\Api\RegisterCodeApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AttendanceApiController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {
    Route::get('/code', [RegisterCodeApiController::class, 'index']);
});

Route::middleware(['web', 'admin'])->prefix('admin')->group(function () {
    Route::get('/attendance', [AttendanceApiController::class, 'index']);
});