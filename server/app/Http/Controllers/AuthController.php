<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function user() {
        return Auth::user();
    }

    public function signin(SignInRequest $request) {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([
                'status' => 401,
                'msg' => 'Invalid credentials!'
            ], 401);
        }
        
        $user = User::where('email', $request->email)->first();

        $token = $user->createToken('prg')->plainTextToken;

        $cookie = cookie('jwt', $token);

        return response([
            'msg' => 'Sign in successfully!',
            'user' => $user,
            'token' => $token
        ])->withCookie($cookie);
    }

    public function signup(SignUpRequest $request) {
        
        try {
            $user = User::create($request->all());

            $token = $user->createToken('token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'msg' => 'Create user successfully!',
                'user' => $user,
                'token' =>$token
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'status' => 500,
                'msg' => $e->getMessage()
            ], 500);        
        }
    }

    public function signout(Request $request) {
        $cookie = Cookie::forget('jwt');

        $request->user()->tokens()->delete();

        return response()->json([
            'msg' => 'Sign out successfully!'
        ])->withCookie($cookie);
    }
}
