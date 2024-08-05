<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ResultController extends Controller
{
    public function createResult(Request $request) {
        
        try {
            Result::create([
                'user_id' => $request->user_id,
                'exam_id' => $request->exam_id,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'review' => $request->review,
                'redo' => $request->redo
             ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'msg' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST); 
        }
    }

    public function getResult($user_id, $exam_id) {
        try {
            $result = Result::where([
                'user_id' => $user_id,
                'exam_id' => $exam_id
            ])->first();

            return $result;

        } catch (Exception $e) {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'msg' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST); 
        }
    }
}
