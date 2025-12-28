<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompetitionRegistration;
use App\Models\Competition;

class CompetitionRegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $competition = Competition::first();

        if ($competition) {
            CompetitionRegistration::firstOrCreate([
                'competition_id' => $competition->id,
                'user_id' => 1,
            ], [
                'status' => 'approved'
            ]);
        }
    }
}
