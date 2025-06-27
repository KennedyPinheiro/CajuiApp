<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Nota;
use App\Models\Matricula;
use App\Models\User;
use App\Models\Atividade;

class Disciplina extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'semestre'];

    public function notas()
    {
        return $this->hasMany(Nota::class);
    }

    public function matriculas()
    {
        return $this->hasMany(Matricula::class);
    }

    public function alunos()
    {
        return $this->belongsToMany(User::class, 'matriculas','disciplina_id', 'aluno_id')
                    ->withPivot('semestre')
                    ->withTimestamps();
    }

    public function atividades()
    {
        return $this->hasMany(Atividade::class);
    }
}
