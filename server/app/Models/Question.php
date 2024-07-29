<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'exam_id',
        'content',
    ];

    public function answers(): HasMany {
        return $this->hasMany(Answer::class);
    }

    public function exam(): BelongsTo {
        return $this->belongsTo(Exam::class);
    }
}
