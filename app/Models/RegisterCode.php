<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegisterCode extends Model
{
    protected $fillable = [
        'code',
        'generation_year',
        'usage',
        'usage_total',
        'is_activated'
    ];
}
