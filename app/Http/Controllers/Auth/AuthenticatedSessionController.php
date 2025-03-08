<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
    
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ('These credentials do not match our records.'),
            ]);
        }
    
        $user = Auth::user(); // Get authenticated user
    
        if($user->status == 1) {
            Auth::logout();
            return redirect()->back()->with('error', ('Unable to log in with the given details. Contact the hr for help.'));
        }else if($user->status == 3 || $user->status == 4) {
            Auth::logout();
            return redirect()->back()->with('error', ('Your account has been deactivated.'));
        }
    
        $request->session()->regenerate();
    
        return redirect()->intended('/dashboard');
    }
    

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
