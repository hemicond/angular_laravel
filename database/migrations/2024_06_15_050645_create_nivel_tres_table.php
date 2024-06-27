<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNivelTresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_tres', function (Blueprint $table) {
            $table->id();

            
            $table->unsignedBigInteger('nivel_dos_id');
            $table->string('codigo_nivel_tres')->unique();
            $table->string('nombre_nivel_tres')->unique();
            $table->string('slug_nivel_tres')->unique();
            $table->text('descripcion_nivel_tres');
            $table->boolean('status_nivel_tres')->default(1);
            $table->foreign('nivel_dos_id')->references('id')->on('nivel_dos');


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
        Schema::dropIfExists('nivel_tres');
    }
}
