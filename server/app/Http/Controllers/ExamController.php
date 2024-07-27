<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function createExam(Request $request) {
        return $request->all();
    }
}
