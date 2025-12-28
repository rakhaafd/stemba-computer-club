<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CompetitionType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

    public function competitions()
    {
        return $this->hasMany(Competition::class);
    }
}
