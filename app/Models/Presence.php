<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    /** @use HasFactory<\Database\Factories\PresenceFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'material_id',
        'status',
        'check_in_time',
    ];

    public function material() {
        return $this->belongsTo(Material::class, 'material_id');
    }
}
