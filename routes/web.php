<?php

use App\Http\Middleware\TimeAccessPresensiMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/leaderboard', function () {
    return inertia('Leaderboard');
});

Route::prefix('/auth')->group(function () {
    require_once __DIR__ . '/auth/user.php';
    Route::prefix('/admin')->group(function () {
        require_once __DIR__ . '/auth/admin.php';
    });
});

Route::prefix('/user/')->group(function () {
    require_once __DIR__ . '/user/presensi.php';
    Route::middleware([TimeAccessPresensiMiddleware::class])->group(function () {
    });
});

Route::get('/', function () {
    return inertia('Home');
});

Route::get('/admin/dashboard', function () {
    return inertia('Admin/Dashboard');
});

Route::get('/admin/dashboard', function () {
    return inertia('Admin/Dashboard');
});
