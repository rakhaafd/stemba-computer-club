<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Competition;
use App\Models\CompetitionType;
use Carbon\Carbon;

class CompetitionSeeder extends Seeder
{
    public function run(): void
    {
        // Pick UI/UX type or fallback to first
        $uiux = CompetitionType::where('slug', 'uiux')->first() ?? CompetitionType::first();

        Competition::create([
            'name' => 'UI/UX Design Hackathon',
            'competition_type_id' => $uiux->id,

            'start_date' => Carbon::create(2025, 4, 10),
            'end_date' => Carbon::create(2025, 4, 12),
            'registration_deadline' => Carbon::create(2025, 4, 5, 23, 59),

            'max_participants' => 30,
            'description' => '48-hour UI/UX design hackathon for creative thinkers!',

            'prizes' => [
                '1st' => 'MacBook Air',
                '2nd' => 'iPad',
                '3rd' => 'Design Courses'
            ],

            'links' => [
                'registration' => 'https://example.com/uiux-hackathon',
                'guidebook' => 'https://example.com/guidebook.pdf'
            ],

            'requirements' => [
                'Team size: 2-4 members',
                'Design tools required',
                'Portfolio submission'
            ],

            'contact_person' => 'Admin Club',
            'contact_email' => 'admin@example.com',

            'status' => 'published',
        ]);
    }
}
