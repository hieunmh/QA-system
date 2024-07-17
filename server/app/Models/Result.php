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
        'result',
        'start_time',
        'end_time',
        'review',
        'redo'
    ];

    protected function casts(): array {
        return [
            'review' => 'boolean',
            'redo' => 'boolean'
        ];
    }
}
