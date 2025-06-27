<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Disciplina;
use App\Models\Matricula;
use Illuminate\Database\Seeder;

class MatriculasSeeder extends Seeder
{
    public function run()
    {
        $alunos = User::where('role_id', 2)->get();
        $disciplinas = Disciplina::all();

        foreach ($alunos as $aluno) {
            foreach ($disciplinas as $disciplina) {
                Matricula::create([
                    'aluno_id' => $aluno->id,
                    'disciplina_id' => $disciplina->id,
                    'semestre' => $disciplina->semestre,
                ]);
            }
        }
    }
}

