<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use App\Http\Requests\StoreNotaRequest;
use Illuminate\Http\Request;
use App\Models\Disciplina;
use App\Models\User;

class NotaController extends Controller
{
    public function store(StoreNotaRequest $request)
    {
        $nota = Nota::create($request->validated());

        return response()->json($nota, 201);
    }

    public function index()
    {
        return Nota::with(['disciplina', 'aluno'])->get();
    }
}
