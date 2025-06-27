<?php

namespace App\Http\Controllers;

use App\Models\Matricula;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    public function index()
    {
        return Matricula::with(['aluno', 'disciplina'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'aluno_id' => 'required|exists:alunos,id',
            'disciplina_id' => 'required|exists:disciplinas,id',
            'semestre' => 'required|string',
        ]);

        $matricula = Matricula::create($request->all());

        return response()->json($matricula->load(['aluno', 'disciplina']), 201);
    }
}


