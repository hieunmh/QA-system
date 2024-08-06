<?php

namespace App\Service;

use App\Models\Answer;
use Illuminate\Support\Str;

class AnswerService 
{
  public function createAnswers($answers, $question_id) {
    $insertAnswers = [];

    foreach($answers as $answer) {
      array_push($insertAnswers, [
        'id' => (string) Str::uuid(),
        'content' => $answer['content'],
        'question_id' => $question_id,
        'is_correct' => $answer['is_correct']
      ]);
    }

    Answer::insert($insertAnswers);
  }

  public function shuffleAnswer($answers) {
    return $answers->shuffle();
  }

  public function getCorrectAnswer($answers) {
    
  }
}