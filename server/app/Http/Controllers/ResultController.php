<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Result;
use App\Service\ResultService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ResultController extends Controller
{   
    protected ResultService $resultService;

    public function __construct(ResultService $resultService) {
        $this->resultService = $resultService;
    }

    public function createResult(Request $request) {
        try {
            Result::upsert([
                'user_id' => $request->user_id,
                'exam_id' => $request->exam_id,
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'review' => $request->review,
                'redo' => $request->redo
            ], ['user_id', 'exam_id']);

        } catch (Exception $e) {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'msg' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST); 
        }
    }

    public function updateResult(Request $request) {
        try {  
            $answers = $request->answers;
            $quantity = $request->quantity;

            if (count($answers) == 0) {
                Result::where([
                    'user_id' => $request->user_id,
                    'exam_id' => $request->exam_id
                ])->update([
                    'score' => 0
                ]);
                
            } else {
                $score = $this->resultService->getCorrectAnswer($answers);

                Result::where([
                    'user_id' => $request->user_id,
                    'exam_id' => $request->exam_id
                ])->update([
                    'score' => ($score / $quantity) * 10
                ]);
            }

            $result = Result::where([
                'user_id' => $request->user_id,
                'exam_id' => $request->exam_id
            ])->first();

            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $result->review ? $result->score : ''
            ], Response::HTTP_OK);

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
