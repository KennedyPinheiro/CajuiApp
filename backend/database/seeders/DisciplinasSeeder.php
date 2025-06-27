<?php

namespace Database\Seeders;

use App\Models\Disciplina;
use Illuminate\Database\Seeder;

class DisciplinasSeeder extends Seeder
{
    public function run()
    {
        $nomes = ['Matemática', 'Português', 'História', 'Geografia', 'Química', 'Física'];
        foreach ($nomes as $nome) {
            Disciplina::create([
                'nome' => $nome,
                'semestre' => rand(1, 2),
            ]);
        }
    }
}
