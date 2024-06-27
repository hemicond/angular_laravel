<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNivelCuatrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_cuatros', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('nivel_tres_id');
            $table->string('codigo_nivel_cuatro')->unique();
            $table->string('nombre_nivel_cuatro')->unique();
            $table->string('slug_nivel_cuatro')->unique();
            $table->text('descripcion_nivel_cuatro');
            $table->boolean('status_nivel_cuatro')->default(1);
            $table->foreign('nivel_tres_id')->references('id')->on('nivel_tres');





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
        Schema::dropIfExists('nivel_cuatros');
    }
}
