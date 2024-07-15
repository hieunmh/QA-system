<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// auth route
Route::controller(AuthController::class)->group(function() {

    Route::post('/signin', 'signIn');
});