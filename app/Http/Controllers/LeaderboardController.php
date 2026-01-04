<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Services\LeaderboardService;

class LeaderboardController extends Controller
{
    public function __construct(public LeaderboardService $service)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd($this->service->get("a"));
        $leaderBoardData = $this->service->get("idk");
        return inertia('Leaderboard', [
        'leaderboardData' => $leaderBoardData, // <- pass the data here
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
    public function store(StoreMaterialRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Material $material)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, Material $material)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        //
    }
}
