<?php

namespace Database\Seeders;

use App\Models\RegisterCode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegisterCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RegisterCode::create([
            'code' => 'WEEK1-UIUX', // initial code
        ]);
    }
}
