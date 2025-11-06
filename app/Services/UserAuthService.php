<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserAuthService
{
    public function register(array $data)
    {
        return User::create([
            'name' => $data['nama'],
            'kelas' => $data['kelas'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
