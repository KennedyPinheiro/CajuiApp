<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Matricula extends Model
{
    use HasFactory;

    protected $fillable = ['aluno_id', 'disciplina_id', 'semestre'];

    public function aluno()
    {
        return $this->belongsTo(User::class, 'matriculas','disciplina_id', 'aluno_id');
    }

    public function disciplina()
    {
        return $this->belongsTo(Disciplina::class);
    }
}
