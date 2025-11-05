<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Services\UserAuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAuth extends Controller
{
    public function __construct(public UserAuthService $user)
    {
        
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Auth');
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
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];
        // $info = 'invalid';
        if (Auth::attempt($credentials)) {
            // $info = 'sucesss';
            // dd($info);
            $request->session()->regenerate();
            return redirect()->intended('/');
        }
        // dd($info);

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function register(Request $request) {
        $this->user->register($request->all());
        return redirect()->intended('/');
    }
}
