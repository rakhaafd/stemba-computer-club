<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CurrentMaterial extends Model
{
    protected $table = 'current_material'; // <- important

    protected $fillable = [
        'material',
    ];
}
