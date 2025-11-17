<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\RegisterCode;
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
            'email' => $request->input('identifier'),
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
        dd('invalid credential');
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

    public function register(Request $request)
    {
        // ✅ Validation rules
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'kode' => 'required|string',
        ]);
        // dd($request->all());
        // ✅ Check register code
        $code = RegisterCode::where('code',$validated['kode'])->first(); // only one active code
        if (!$code) {
            return back()->withErrors(['kode' => 'Kode pendaftaran tidak valid.']);
        }

        $validated['generation_year'] = $code->generation_year;
        // dd($validated);

        // ✅ Create user
        $user = $this->user->register($validated);

        // ✅ Auto-login after register
        Auth::login($user);

        return redirect()->intended('/');
    }

    public function logout(Request $request) {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/auth/login');
    }
}