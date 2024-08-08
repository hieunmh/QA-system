<?php

namespace App\Service;
use App\Models\History;

class HistoryService 
{
  public function insert($user_id, $exam_id, $answers) {
    $histories = [];

    foreach($answers as $answer) {
      array_push($histories, [
        'user_id' => $user_id,
        'exam_id' => $exam_id,
        'question_id' => $answer['question_id'],
        'answer_id' => $answer['answer_id']
      ]);
    }
    History::upsert($histories, ['user_id', 'exam_id', 'question_id']);
  }
}