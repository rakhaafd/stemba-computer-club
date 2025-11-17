<?php

use App\Http\Controllers\Admin\RegisterCodeController;
use Illuminate\Support\Facades\Route;

Route::resource('code', RegisterCodeController::class);