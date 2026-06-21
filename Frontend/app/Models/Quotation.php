<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quotation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status'
    ];

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }
}