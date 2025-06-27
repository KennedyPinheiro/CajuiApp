<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Nota extends Model
{
    use HasFactory;

    protected $fillable = ['aluno_id', 'disciplina_id', 'nota1', 'nota2', 'nota3'];

    public function aluno(){
    return $this->belongsTo(User::class, 'aluno_id');}

    public function disciplina()
    {
        return $this->belongsTo(Disciplina::class);
    }
}
