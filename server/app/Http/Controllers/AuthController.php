<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function user() {
        return Auth::user();
    }

    public function signin(Request $request) {
        Auth::attempt($request->only(['email', 'password']));
        
        $user = User::where('email', $request->email)->first();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token);

        return response([
            'msg' => 'sign in successfully.',
            'token' => $token
        ])->withCookie($cookie);
    }

    public function signup(Request $request) {
        
        $user = User::create($request->all());

        return response()->json([
            'status' => 200,
            'msg' => 'create user successfully.',
            'user' => $user
        ]);
    }

    public function signout() {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Success'
        ])->withCookie($cookie);
    }
}
