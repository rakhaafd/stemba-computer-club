<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserAdminRequest;
use App\Http\Requests\UpdateUserAdminRequest;
use App\Models\UserAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Admin/Auth');
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
        if (Auth::guard('admin')->attempt($credentials)) {
            // $info = 'sucesss';
            // dd($info);
            $request->session()->regenerate();
            return redirect()->intended('/admin/dashboard');
        }
        // dd($info);
        dd('invalid credential');
        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserAdmin $userAdmin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserAdmin $userAdmin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserAdminRequest $request, UserAdmin $userAdmin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserAdmin $userAdmin)
    {
        //
    }

    public function logout(Request $request) {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/auth/admin/login');
    }
}
