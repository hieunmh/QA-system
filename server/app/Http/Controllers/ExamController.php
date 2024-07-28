<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateExamRequest;
use App\Models\Exam;
use App\Service\QuestionService;
// use App\Service\QuestionService;
use Illuminate\Http\Response;

class ExamController extends Controller
{
    protected QuestionService $questionService;

    public function __construct(QuestionService $questionService) {
        $this->questionService = $questionService;
    }

    public function createExam(CreateExamRequest $request) {
        $exam = $request->except(['questions']);

        $questions = $request->only(['questions']);

        try {
            $res = Exam::create($exam);
            
            $this->questionService->createQuestion(array_values($questions), $res->id);
            
            return response()->json([
                'status' => Response::HTTP_CREATED,
                'msg' => 'Create exam successfully!',
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'msg' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST); 
        }
    }
}
