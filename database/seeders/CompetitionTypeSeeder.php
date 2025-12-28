<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompetitionType;

class CompetitionTypeSeeder extends Seeder
{
    public function run(): void
    {
        $types = [
            ['name' => 'Cyber Security', 'slug' => 'cyber-security'],
            ['name' => 'Programming', 'slug' => 'programming'],
            ['name' => 'UI/UX Design', 'slug' => 'uiux'],
            ['name' => 'Web Development', 'slug' => 'web-dev'],
            ['name' => 'Networking', 'slug' => 'networking'],
            ['name' => 'Competitive Programming', 'slug' => 'cp'],
        ];

        foreach ($types as $type) {
            CompetitionType::firstOrCreate(['slug' => $type['slug']], $type);
        }
    }
}
