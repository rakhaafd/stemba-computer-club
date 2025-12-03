<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Presence;
use App\Models\RegisterCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AttendanceApiController extends Controller
{
    public function index()
    {
    //     const [attendanceData, setAttendanceData] = useState([
    //     { id: 1, name: 'John Doe', class: '12A', email: 'john@email.com', branch: 'Programming', date: '2024-01-15', status: 'Present' },
    //     { id: 2, name: 'Sarah Smith', class: '11B', email: 'sarah@email.com', branch: 'UI/UX', date: '2024-01-15', status: 'Present' },
    //     { id: 3, name: 'Mike Johnson', class: '12C', email: 'mike@email.com', branch: 'Cyber Security', date: '2024-01-15', status: 'Absent' },
    // ]);
        $users = Presence::all();

        // Transform each user into the desired structure
        $data = $users->map(function ($user) {

            return [
                'id' => $user->id,
                'name' => $user->user->name,
                'class' => $user->user->kelas,
                'email' => $user->user->email,
                // Optionally, mark the first one as active
                'branch' => $user->material->title,
                'date' => $user->created_at->format('d M Y - H:i:s'),
                'status' => $user->status,
            ];
        })->toArray();
        return $data;
    }
}
