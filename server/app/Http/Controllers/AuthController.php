<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function signIn(SignInRequest $request) {
        return $request;
    }

    public function signUp(SignUpRequest $request) {
        try {
            $user = User::create([
                'name' => $request->username,
                'email' => $request->email,
                'password' => $request->password
            ]);

            return response()->json([
                'status' => 200,
                'msg' => 'Account created sucessfully!',
                'user' => $user
            ]);

        } catch (\Exception $e) {
            
            return response()->json([
                'status' => 500,
                'msg' => $e->getMessage()
            ], 500);
        }
    }
}
