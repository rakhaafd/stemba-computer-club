<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAdmin extends Model
{
    protected $fillable = [
        'username',
        'email',
        'password',
    ];
    /** @use HasFactory<\Database\Factories\UserAdminFactory> */
    use HasFactory;
}
