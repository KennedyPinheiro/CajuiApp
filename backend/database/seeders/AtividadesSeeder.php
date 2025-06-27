<?php

namespace Database\Seeders;

use App\Models\Disciplina;
use App\Models\Atividade;
use Illuminate\Database\Seeder;

class AtividadesSeeder extends Seeder
{
    public function run()
    {
        $disciplinas = Disciplina::all();

        foreach ($disciplinas as $disciplina) {
            for ($i = 1; $i <= 3; $i++) {
                Atividade::create([
                    'disciplina_id' => $disciplina->id,
                    'titulo' => "Atividade $i - {$disciplina->nome}",
                    'descricao' => "Descrição da atividade $i da disciplina {$disciplina->nome}",
                    'max_pontos' => 10,
                    'data_entrega' => now()->addDays(7 * $i),
                ]);
            }
        }
    }
}

