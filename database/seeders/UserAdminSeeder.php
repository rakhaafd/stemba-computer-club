<?php

namespace Database\Seeders;

use App\Models\UserAdmin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserAdmin::create([
            'username' => 'admin',
            'email' => 'admin@stembascc.com',
            'password' => Hash::make('121212'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
