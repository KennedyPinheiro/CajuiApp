<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatriculasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('matriculas', function (Blueprint $table) {
        $table->id();
        $table->foreignId('aluno_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('disciplina_id')->constrained()->onDelete('cascade');
        $table->string('semestre');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matriculas');
    }
}
