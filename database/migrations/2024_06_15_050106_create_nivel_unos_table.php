<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNivelUnosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_unos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo_nivel_uno')->unique();
            $table->string('nombre_nivel_uno')->unique();
            $table->string('slug_nivel_uno')->unique();
            $table->text('descripcion_nivel_uno');
            $table->boolean('status_nivel_uno')->default(1);
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
        Schema::dropIfExists('nivel_unos');
    }
}
