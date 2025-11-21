<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RegisterCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RegisterCodeApiController extends Controller
{
    public function index()
    {
        return RegisterCode::orderBy('id', 'desc')->get();
    }
}
