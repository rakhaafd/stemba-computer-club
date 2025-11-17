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
            'generation_year' => $data['generation_year'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
