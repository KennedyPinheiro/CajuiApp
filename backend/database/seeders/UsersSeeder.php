<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $alunos = [
            ['name' => 'Alice Silva',   'email' => 'alice@example.com',   'matricula' => '2025001'],
            ['name' => 'Bruno Souza',   'email' => 'bruno@example.com',   'matricula' => '2025002'],
            ['name' => 'Carlos Lima',   'email' => 'carlos@example.com',  'matricula' => '2025003'],
            ['name' => 'Daniela Costa', 'email' => 'daniela@example.com', 'matricula' => '2025004'],
            ['name' => 'Eduardo Melo',  'email' => 'eduardo@example.com', 'matricula' => '2025005'],
        ];

        foreach ($alunos as $aluno) {
            User::create([
                'name' => $aluno['name'],
                'email' => $aluno['email'],
                'matricula' => $aluno['matricula'],
                'password' => Hash::make('123456'),
                'role_id' => 2,
            ]);
        }
    }
}
