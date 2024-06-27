<?php

use App\Http\Controllers\Admin\Usuario\UsuarioController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/* Route::get('/user', function (Request $request) {
return $request->user();
})->middleware('auth:sanctum');
 */

Route::group(['middleware' => 'api'], function ($routes) {

});

Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::post('/login', [AuthController::class, 'login'])->name('login');
/* Route::resource("roles", RolesController::class); */

Route::group([
    'middleware' => 'auth:api'], function ($router) {

    Route::get("usuarios/config", [UsuarioController::class, "config"]);
    Route::resource("usuarios", UsuarioController::class);

});

Route::apiResource('users', UserController::class);
Route::apiResource('roles', RoleController::class);
