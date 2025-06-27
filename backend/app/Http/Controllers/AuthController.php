<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nome' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'telefone' => 'required|string',
        'password' => 'required|string|min:6|confirmed',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $matricula = $this->generateUniqueMatricula();

    $user = User::create([
        'name' => $request->nome,
        'email' => $request->email,
        'matricula' => $matricula,
        'telefone' => $request->telefone,
        'password' => Hash::make($request->password),
        'role_id' => 2,
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Usuário registrado com sucesso!',
        'user' => $user,
        'token' => $token
    ], 201);
}

private function generateUniqueMatricula()
{
    do {
        $matricula = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    } while (User::where('matricula', $matricula)->exists());

    return $matricula;
}

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'matricula' => $user->matricula,
                'role_id' => $user->role_id,
            ],
            'token' => $token,
        ]);
    }
}
