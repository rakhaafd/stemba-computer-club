<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RegisterCode;
use App\Services\Admin\RegisterCodeService;
use Illuminate\Http\Request;

class RegisterCodeController extends Controller
{
    public function __construct(public RegisterCodeService $code)
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validated = $request->validate([
            'generation_year'   => ['required', 'string', 'max:255'],
            'usage_total'   => ['required', 'integer'],
        ]);

        if ($this->code->check_is_year_available($validated['generation_year'])) {
            return back()->withErrors([
            'generation_year' => 'angkatan sudah memiliki regis code',
            ]);
        }
        $code = $this->code->add_code($validated);
        return back()->with('status', 'success');
    }

    /**
     * Display the specified resource.
     */
    public function show(RegisterCode $registerCode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RegisterCode $registerCode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RegisterCode $code)
    {
        $code->is_activated = false;
        $code->save();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RegisterCode $registerCode)
    {
        //
    }
}
