<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/tes', function () {
    return inertia('Leaderboard');
});

