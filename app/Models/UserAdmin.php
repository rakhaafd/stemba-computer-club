<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class UserAdmin extends Authenticatable
{
    protected $fillable = [
        'username',
        'email',
        'password',
    ];
    /** @use HasFactory<\Database\Factories\UserAdminFactory> */
    use HasFactory, Notifiable;
}
