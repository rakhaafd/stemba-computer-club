<?php

use App\Http\Controllers\UserAuth;
use Illuminate\Support\Facades\Route;

Route::resource('login', UserAuth::class);
Route::post('/register',[UserAuth::class,'register']);