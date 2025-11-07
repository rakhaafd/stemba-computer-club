<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PresenceCode extends Model
{
    protected $fillable = [
        'user_id',
        'material_id',
        'status',
        'check_in_time',
    ];
}
