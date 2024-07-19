<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUser() {
        try {
            return response()->json(new UserResource(Auth::user()), 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage(),], 400);
        }
    }
}
