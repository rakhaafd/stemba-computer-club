<?php

namespace App\Http\Controllers;

use App\Models\Presence;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePresenceRequest;
use App\Http\Requests\UpdatePresenceRequest;
use App\Models\CurrentMaterial;
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
        $materi = CurrentMaterial::get();
        // dd($materi);
        $subject = [$materi[0]->material];
        return inertia('Presensi',[
            'subject' => $subject,
        ]);
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
            'nama'    => ['required', 'string', 'max:255'],
            'kelas'   => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email'],
            'kode'    => ['required', 'string'],
            'subject' => ['required', 'string'],
        ]);

        $new_model = $this->service->store($validated);

        // ✅ 7. Redirect success
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
