<?php

namespace Database\Seeders;

use App\Models\CurrentMaterial;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrentMaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CurrentMaterial::create([
            'material' => 'Cyber Security',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
