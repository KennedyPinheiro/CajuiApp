<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use App\Http\Requests\StoreDisciplinaRequest;

class DisciplinaController extends Controller
{
    public function store(StoreDisciplinaRequest $request)
    {
        $disciplina = Disciplina::create($request->only(['nome', 'semestre']));

        return response()->json($disciplina, 201);
    }

    public function index()
    {
        $disciplinas = Disciplina::all();

        return response()->json($disciplinas);
    }
}
