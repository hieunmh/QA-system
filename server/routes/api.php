<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// auth route
Route::controller(AuthController::class)->prefix('/auth')->group(function() {

    Route::post('/signin', 'signIn');
    Route::post('/signup', 'signUp');
});
