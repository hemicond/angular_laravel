<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNivelDosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_dos', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('nivel_uno_id');
            $table->string('codigo_nivel_dos')->unique();
            $table->string('nombre_nivel_dos')->unique();
            $table->string('slug_nivel_dos')->unique();
            $table->text('descripcion_nivel_dos');
            $table->boolean('status_nivel_dos')->default(1);
            $table->foreign('nivel_uno_id')->references('id')->on('nivel_unos');

           
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
        Schema::dropIfExists('nivel_dos');
    }
}
