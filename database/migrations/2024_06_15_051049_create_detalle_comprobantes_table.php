<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetalleComprobantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_comprobantes', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('comprobante_diario_id');
            $table->unsignedBigInteger('nivel_cinco_id');

            $table->boolean('detalle_movimiento')->default(0); // DEBE = 0 ; HABER = 1
       /*   $table->enum('detalle_movimiento',['DEBE','HABER'])->default('DEBE');   */
            $table->decimal('detalle_monto',12,2);

            
            $table->boolean('status_detalle_comprobante')->default(1);

            $table->foreign('comprobante_diario_id')->references('id')->on('comprobantes_diarios');
            $table->foreign('nivel_cinco_id')->references('id')->on('nivel_cincos');

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
        Schema::dropIfExists('detalle_comprobantes');
    }
}
