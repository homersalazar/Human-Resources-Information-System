<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'startentdate',
        'endentdate',
        'default_leave_type'
    ];
}
