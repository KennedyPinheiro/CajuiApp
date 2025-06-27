<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AlunoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
{
    return [
        'nome' => $this->faker->name,
        'cpf' => $this->faker->unique()->numerify('###########'),
        'email' => $this->faker->unique()->safeEmail,
        'senha' => bcrypt('123456'),
    ];
}
}
