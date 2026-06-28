<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vendor extends Model
{
    protected $fillable = [
        'user_id',
        'vendor_name',
        'company_name',
        'email',
        'phone',
        'address',
        'status'
    ];

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}