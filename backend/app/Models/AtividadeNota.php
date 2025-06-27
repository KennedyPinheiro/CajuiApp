<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Atividade;

class AtividadeNota extends Model
{
    use HasFactory;

    protected $table = 'atividade_nota';

    protected $fillable = ['atividade_id', 'aluno_id', 'nota'];
    public function atividade()
    {
        return $this->belongsTo(Atividade::class);
    }

    public function aluno()
    {
        return $this->belongsTo(User::class,'matriculas','disciplina_id', 'aluno_id');
    }
}
