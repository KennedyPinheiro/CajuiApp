<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AtividadeNota;

class AtividadeNotaController extends Controller
{

    public function index(Request $request)
{
    if (!$request->has('aluno_id')) {
        return response()->json([
            'error' => 'Parâmetro aluno_id é obrigatório.'
        ], 400);
    }

    $notas = AtividadeNota::where('aluno_id', $request->aluno_id)->get();

    if ($notas->isEmpty()) {
        return response()->json([
            'message' => 'Nenhuma nota encontrada para este aluno.',
            'notas' => []
        ]);
    }

    return response()->json($notas);
}
}
