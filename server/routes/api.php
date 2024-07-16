<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;



//auth controller
Route::controller(AuthController::class)->group(function() {

    Route::post('/signup', 'signup');

    Route::post('/signin', 'signin');

    Route::get('/user', 'user')->middleware('auth:sanctum');

    Route::post('/signout', 'signout')->middleware('auth:sanctum');
});
