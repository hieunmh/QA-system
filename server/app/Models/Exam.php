<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exam extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'code',
        'review',
        'redo',
        'time',
        'subject'
    ];

    public function questions(): HasMany {
        return $this->hasMany(Question::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function results(): HasMany {
        return $this->hasMany(Result::class);
    }

    public function histories(): HasMany {
        return $this->hasMany(History::class);
    }

    protected $casts = [
        'redo' => 'boolean',
        'review' => 'boolean',
    ];
}
