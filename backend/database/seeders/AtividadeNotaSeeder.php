<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Atividade;
use App\Models\AtividadeNota;
use Illuminate\Database\Seeder;

class AtividadeNotaSeeder extends Seeder
{
    public function run()
    {
        $atividades = Atividade::all();
        $alunos = User::where('role_id', 2)->get();

        foreach ($atividades as $atividade) {
            foreach ($alunos as $aluno) {
                AtividadeNota::create([
                    'atividade_id' => $atividade->id,
                    'aluno_id' => $aluno->id,
                    'nota' => rand(5, 10),
                ]);
            }
        }
    }
}

