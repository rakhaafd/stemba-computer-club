<?php

use App\Http\Middleware\TimeAccessPresensiMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::prefix('/auth')->group(function () {
    require_once __DIR__ . '/auth/auth.php';
});

Route::prefix('/user/')->group(function () {
    require_once __DIR__ . '/user/presensi.php';
    Route::middleware([TimeAccessPresensiMiddleware::class])->group(function () {
    });
});

Route::get('/', function () {
    return inertia('Home');
});