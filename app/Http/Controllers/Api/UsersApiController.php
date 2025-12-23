<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UsersApiController extends Controller
{
    public function index()
    {
        return User::orderBy('id', 'desc')->get();
    }
}
