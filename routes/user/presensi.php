<?php

use App\Http\Controllers\PresenceController;
use App\Http\Controllers\UserAuth;
use Illuminate\Support\Facades\Route;

Route::resource('presensi', PresenceController::class);