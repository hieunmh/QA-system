<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'code',
        'question_quantity',
        'review',
        'redo',
        'time'
    ];
}
