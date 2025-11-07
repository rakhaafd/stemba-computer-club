<?php

namespace App\Services;

use App\Models\Material;
use App\Models\Presence;
use App\Models\PresenceCode;
use App\Models\User;

class PresenceService
{
    public function store($validated) {
        // ✅ 2. Match subject to valid list (case-sensitive)
        $validSubjects = ["UI/UX Design", "Cyber Security", "Web Programming"];

        if (!in_array($validated['subject'], $validSubjects, true)) {
            return back()->withErrors(['subject' => 'Subject tidak valid.']);
        }

        // ✅ 3. Find latest Material record by subject
        $material = Material::where('title', $validated['subject'])
            ->latest('id')
            ->first();

        // dd($material);
            if (! $material) {
            return back()->withErrors(['subject' => 'Materi tidak ditemukan untuk subject ini.']);
        }

        $materialId = $material->id;

        // ✅ 4. Find user
        $user = User::where('email', $validated['email'])->first();

        if (! $user) {
            return back()->withErrors(['email' => 'Email tidak ditemukan di sistem.']);
        }

        // ✅ 5. Validate presence code
        $presenceCode = PresenceCode::first();

        if (! $presenceCode || $presenceCode->code !== $validated['kode']) {
            return back()->withErrors(['kode' => 'Kode presensi tidak valid.']);
        }

        // ✅ 6. Get current week
        $weekNumber = $material->week_number;

        // ✅ 7. Prevent duplicate attendance for same week + subject
        $alreadyPresent = Presence::where('user_id', $user->id)
        ->where('material_id', $material->id)
        ->exists();



        if ($alreadyPresent) {
            return back()->withErrors(['email' => 'Kamu sudah melakukan presensi untuk minggu ini.']);
        }

        // ✅ 8. Determine presence status (present or late)
        $now = now();
        $cutoff = $now->copy()->setTime(15, 0, 0);
        $status = $now->greaterThan($cutoff) ? 'late' : 'present';

        // ✅ 9. Store new presence
        Presence::create([
            'user_id'       => $user->id,
            'material_id'   => $materialId,
            'status'        => $status,
            'check_in_time' => $now,
            'week_number'   => $weekNumber,
        ]);
    }
}