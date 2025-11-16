<?php

use App\Http\Controllers\UserAdminController;
use App\Http\Controllers\UserAuth;
use Illuminate\Support\Facades\Route;

Route::resource('login', UserAdminController::class);
// Route::post('/register',[UserAuth::class,'register']);