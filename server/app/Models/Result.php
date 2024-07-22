<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'exam_id',
        'score',
        'start_time',
        'end_time',
        'review',
        'redo'
    ];
}
