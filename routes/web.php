<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/tes', function () {
    return inertia('Leaderboard');
});

Route::prefix('/auth')->group(function () {
    require_once __DIR__ . '/auth/auth.php';
});

Route::prefix('/user')->group(function () {
    require_once __DIR__ . '/user/presensi.php';
});

Route::get('/', function () {
    return inertia('Home');
});
