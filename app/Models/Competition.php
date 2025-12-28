<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Competition extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'competition_type_id',
        'start_date',
        'end_date',
        'registration_deadline',
        'max_participants',
        'description',
        'prizes',
        'links',
        'requirements',
        'contact_person',
        'contact_email',
        'status',
    ];

    protected $casts = [
        'prizes' => 'array',
        'links' => 'array',
        'requirements' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'registration_deadline' => 'datetime',
    ];

    public function type()
    {
        return $this->belongsTo(CompetitionType::class, 'competition_type_id');
    }

    public function registrations()
    {
        return $this->hasMany(CompetitionRegistration::class);
    }
}
