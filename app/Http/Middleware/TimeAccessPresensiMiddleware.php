<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;

class TimeAccessPresensiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Set timezone (optional, change if needed)
        $now = Carbon::now('Asia/Jakarta');

        // Define target date and time window
        $targetDate = Carbon::createFromFormat('Y-m-d H:i', '2025-10-07 15:30', 'Asia/Jakarta');
        $endTime    = Carbon::createFromFormat('Y-m-d H:i', '2025-10-07 17:00', 'Asia/Jakarta');

        if ($now->between($targetDate, $endTime)) {
            return $next($request); // ✅ Allow access
        }

        // ❌ Block access outside allowed time
        return inertia('Home')->toResponse($request)->setStatusCode(403);;
        // Or redirect:
        // return redirect('/not-available');
    }
}
