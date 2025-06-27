<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class RelatorioController extends Controller
{
    public function calcularNotaFinal(Request $request)
    {
    $request->validate([
        'aluno_id' => 'required|integer|exists:users,id',
        'disciplina_id' => 'required|integer|exists:disciplinas,id',
    ]);

    $alunoId = $request->input('aluno_id');
    $disciplinaId = $request->input('disciplina_id');

    // Buscar todas as atividades da disciplina
    $atividades = DB::table('atividades')
        ->where('disciplina_id', $disciplinaId)
        ->get();

    $atividadeIds = $atividades->pluck('id');

    // Soma total de pontos máximos
    $totalMaxPontos = $atividades->sum('max_pontos');

    // Somar as notas do aluno nessas atividades
    $totalNota = DB::table('atividade_nota')
        ->whereIn('atividade_id', $atividadeIds)
        ->where('aluno_id', $alunoId)
        ->sum('nota');

    // Cálculo da média
    $notaFinal = $totalMaxPontos > 0 ? ($totalNota / $totalMaxPontos) * 10 : 0;

    return response()->json([
        'nota_final' => round($notaFinal, 2),
        'total_nota' => round($totalNota, 2),
        'total_max_pontos' => round($totalMaxPontos, 2)
    ]);
}
}
