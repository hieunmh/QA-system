<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function exams(): HasMany {
        return $this->hasMany(Exam::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
