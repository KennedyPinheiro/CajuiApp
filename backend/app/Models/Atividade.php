<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atividade extends Model
{
    use HasFactory;
    
    public function disciplina()
    {
        return $this->belongsTo(Disciplina::class);
    }

    public function notas()
    {
        return $this->hasMany(AtividadeNota::class);
    }
}
