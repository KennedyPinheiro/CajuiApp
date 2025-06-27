<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\RelatorioController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\NotaController;
use App\Http\Controllers\MatriculaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\AtividadeNotaController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('alunos', UserController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::apiResource('disciplinas', DisciplinaController::class)->only(['index', 'store']);
    Route::apiResource('matriculas', MatriculaController::class)->only(['index', 'store']);
    Route::apiResource('atividades', AtividadeController::class)->only(['index', 'store']);
    Route::apiResource('notas', NotaController::class)->only(['index', 'store']);

    Route::get('/atividade-notas', [AtividadeNotaController::class, 'index']);
    Route::get('/nota-final', [RelatorioController::class, 'calcularNotaFinal']);
    Route::get('/user', fn(Request $request) => $request->user());
});
