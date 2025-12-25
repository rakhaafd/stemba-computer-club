<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LeaderBoardApiController extends Controller
{
    public function index(Request $request)
{
    $filter = $request->input('filter'); // "Total", "Cyber Security", etc.

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
                'branch' => "-", // replace with $user->branch if available
                'class' => $user->kelas,
                'attendance' => $total,
                'total' => $total_session,
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

    return response()->json($attendanceData);
}


}
