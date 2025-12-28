<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Competition;
use Illuminate\Http\Request;

class CompetitionApiController extends Controller
{
    public function index(Request $request)
    {
        $competitions = Competition::with('type', 'registrations')->orderBy('created_at', 'desc')->get();

        // Transform to frontend format
        $response = $competitions->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name,
                'type' => $c->type?->slug,                                // "programming"
                'startDate' => $c->start_date?->format('Y-m-d'),
                'endDate' => $c->end_date?->format('Y-m-d'),
                'registrationDeadline' => $c->registration_deadline?->toISOString(),  // dateTime
                'maxParticipants' => $c->max_participants,
                'status' => $c->status,
                'participants' => $c->registrations?->count() ?? 0,
                'description' => $c->description,
                'prizes' => $c->prizes,                                   // array
                'links' => $c->links,                                     // array
                'requirements' => $c->requirements,                       // array
                'contactPerson' => $c->contact_person,
                'contactEmail' => $c->contact_email,
                'createdAt' => $c->created_at?->toDateString(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $response
        ]);
    }
}
