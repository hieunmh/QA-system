<?php

namespace App\Service;

use App\Models\Answer;

class ResultService 
{

  public function getCorrectAnswer($answersList) {
    $is_correct = 0;
    $answers = Answer::whereIn('id', $answersList)->get();
    foreach($answers as $answer) {
      if ($answer->is_correct == 1) $is_correct++;
    }

    return $is_correct;
  }
}