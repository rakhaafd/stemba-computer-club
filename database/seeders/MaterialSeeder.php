<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Material;
use Carbon\Carbon;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $materials = [
            [
                'title' => 'UI/UX Design',
                'description' => 'Introduction to User Interface and User Experience Design.',
                'week_number' => 2,
                'date' => Carbon::create(2025, 11, 10), // example date
            ],
            [
                'title' => 'Cyber Security',
                'description' => 'Fundamentals of information security and threat prevention.',
                'week_number' => 2,
                'date' => Carbon::create(2025, 11, 11),
            ],
            [
                'title' => 'Web Programming',
                'description' => 'Learn how to build dynamic web applications using PHP and Laravel.',
                'week_number' => 2,
                'date' => Carbon::create(2025, 11, 12),
            ],
        ];

        foreach ($materials as $material) {
            Material::create($material);
        }
    }
}
