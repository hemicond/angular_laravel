<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNivelCincosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_cincos', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('nivel_cuatro_id');
            $table->string('codigo_nivel_cinco')->unique();
            $table->string('nombre_nivel_cinco')->unique();
            $table->string('slug_nivel_cinco')->unique();
            $table->text('descripcion_nivel_cinco');
            $table->boolean('dif_nivel_cinco')->default(0);
            $table->boolean('status_nivel_cinco')->default(1);
            $table->foreign('nivel_cuatro_id')->references('id')->on('nivel_cuatros');


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
        Schema::dropIfExists('nivel_cincos');
    }
}
