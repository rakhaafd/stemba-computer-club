<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LeaderBoardApiController extends Controller
{
    public function index()
    {
        $attendanceData = User::with(['presences.material'])
    ->get()
    ->map(function($user) {
        // Group presences by material title and count them
        $materialCounts = $user->presences
            ->groupBy(fn($p) => $p->material->title)
            ->map(fn($group) => $group->count());

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'branch' => "-",
            'materials' => $materialCounts, // { "Material 1": 2, "Material 2": 1 }
        ];
    });

    return $attendanceData;

    }
}
