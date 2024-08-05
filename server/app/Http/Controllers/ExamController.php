<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateExamRequest;
use App\Http\Requests\GetExamRequest;
use App\Http\Resources\ExamResource;
use App\Models\Exam;
use App\Service\AnswerService;
use App\Service\QuestionService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    protected QuestionService $questionService;
    protected AnswerService $answerService;

    public function __construct(QuestionService $questionService, AnswerService $answerService) {
        $this->questionService = $questionService;
        $this->answerService = $answerService;
    }

    public function createExam(CreateExamRequest $request) {
        $exam = $request->except(['questions']);

        $questions = $request->only(['questions'])['questions'];

        try {
            $res = Exam::create($exam);
            $contents = $this->questionService->createQuestion($questions, $res->id);
            for ($i = 0; $i < count($contents); $i++) {
                $this->answerService->createAnswers($questions[$i]['answers'], $contents[$i]['id']);
            }
            
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

    public function getExams() {
        $user_id = Auth::user()->id;

        $exam = Exam::with(['questions', 'questions.answers'])->where([
            'user_id' => $user_id
        ])->get();

        return $exam;
    }

    public function getExam($code) {    
        

        $exam = Exam::with(['questions', 'questions.answers'])->where([
            'code' => $code,
        ])->first();

        $exam->questions = $this->questionService->shuffleQuestion($exam->questions);

        for ($i = 0 ; $i < count($exam->questions); $i++) {
            $exam->questions[$i]->answers = $this->answerService->shuffleAnswer($exam->questions[$i]->answers);
        }

        return new ExamResource($exam);
    }
}
