<?php

namespace App\Services;

use App\Models\Material;
use App\Models\Presence;
use App\Models\PresenceCode;
use App\Models\User;

class LeaderboardService
{
     public function get($request)
{
    // $filter = $request->input('filter'); // "Total", "Cyber Security", etc.

    $filter = "Total"; // "Total", "Cyber Security", etc.

    // Get total sessions
    if ($filter == "Total") {
        $total_session = Material::count();
    } else {
        $total_session = Material::where("title", $filter)->count();
    }

    // Fetch users with presences
    $attendanceData = User::with(['presences.material'])
        ->get()
        ->map(function ($user) use ($filter, $total_session) {
            // Group presences by material title and count them
            $materialCounts = $user->presences
                ->groupBy(fn($p) => $p->material->title)
                ->map(fn($group) => $group->count());

            // Calculate total based on filter
            $total = ($filter && $filter !== 'Total') 
                ? $materialCounts->get($filter, 0) 
                : $materialCounts->sum();

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'field' => "programming", // replace with $user->branch if available
                'class' => $user->kelas,
                'attendance' => $total,
                'total' => $total_session,
                'joinedYear' => $user->created_at->year,
                'initial' => strtoupper(substr($user->name, 0, 1) . substr(strrchr($user->name, ' '), 1, 1) ?? ''),
                'projects' => 0, // dummy for now, replace it with $user->projects because havent have project page
            ];
        });

    // Sort by attendance descending
    $attendanceData = $attendanceData->sortByDesc('attendance')->values();

    // Assign ranks
    $rank = 1;
    $previousAttendance = null;
    $attendanceData = $attendanceData->map(function ($item) use (&$rank, &$previousAttendance) {
        if ($previousAttendance !== null && $item['attendance'] < $previousAttendance) {
            $rank++;
        }
        $previousAttendance = $item['attendance'];
        $item['rank'] = $rank;
        return $item;
    });

    return $attendanceData;
}
}