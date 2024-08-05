<?php

use App\Http\Controllers\ExamController;
use App\Http\Controllers\ResultController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function() {

    Route::get('/user', function(Request $request) {
        return $request->user();
    });
    Route::post('/createExam', [ExamController::class, 'createExam']);

    Route::get('/exam/{code}', [ExamController::class, 'getExam']);

    Route::get('/exams', [ExamController::class, 'getExams']);

    Route::post('/result',[ResultController::class, 'createResult']);

    Route::get('/result/{user_id}/{exam_id}', [ResultController::class, 'getResult']);
});
