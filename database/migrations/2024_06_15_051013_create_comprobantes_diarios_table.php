<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComprobantesDiariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comprobantes_diarios', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('asiento_id');
            
            $table->string('fecha_comprobante')->unique();
            $table->text('concepto_comprobante');
            $table->boolean('status_comprobante')->default(1);

            $table->foreign('asiento_id')->references('id')->on('asientos');

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
        Schema::dropIfExists('comprobantes_diarios');
    }
}
