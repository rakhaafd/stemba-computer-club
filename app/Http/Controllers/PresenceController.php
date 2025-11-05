<?php

namespace App\Http\Controllers;

use App\Models\Presence;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePresenceRequest;
use App\Http\Requests\UpdatePresenceRequest;
use App\Models\PresenceCode;
use App\Models\User;
use App\Services\PresenceService;
use Illuminate\Http\Request;

class PresenceController extends Controller
{
    public function __construct(public PresenceService $service)
    {
        
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Presensi');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // ✅ 1. Validate input
        $validated = $request->validate([
            'nama'  => ['required', 'string', 'max:255'],
            'kelas' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'kode'  => ['required', 'string'],
        ]);

        // ✅ 2. Find user
        $user = User::where('email', $validated['email'])->first();

        if (! $user) {
            return back()->withErrors(['email' => 'Email tidak ditemukan di sistem.']);
        }

        // ✅ 3. Validate presence code
        $presenceCode = PresenceCode::first();

        if (! $presenceCode || $presenceCode->code !== $validated['kode']) {
            return back()->withErrors(['kode' => 'Kode presensi tidak valid.']);
        }

        // ✅ 4. Determine material (you can customize this part)
        // For now, we’ll assume the current material is the latest one
        dd("wait");
        $materialId = $this->service->getCurrentMaterialId(); // ← implement in your service

        // ✅ 5. Check duplicate presence
        $alreadyPresent = Presence::where('user_id', $user->id)
            ->where('material_id', $materialId)
            ->exists();

        if ($alreadyPresent) {
            return back()->withErrors(['email' => 'Kamu sudah melakukan presensi untuk materi ini.']);
        }

        // ✅ 6. Store presence using your service
        $presence = $this->service->store([
            'user_id' => $user->id,
            'material_id' => $materialId,
            'status' => 'present',
            'check_in_time' => now(),
        ]);

        // ✅ 7. Redirect back with success
        return redirect()->back()->with('success', 'Presensi berhasil disimpan.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Presence $presence)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Presence $presence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePresenceRequest $request, Presence $presence)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Presence $presence)
    {
        //
    }
}
