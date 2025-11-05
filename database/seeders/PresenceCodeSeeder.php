<?php

namespace Database\Seeders;

use App\Models\PresenceCode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PresenceCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PresenceCode::create([
            'code' => 'WEEK1-UIUX', // initial code
        ]);
    }
}
