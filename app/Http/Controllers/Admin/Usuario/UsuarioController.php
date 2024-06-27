<?php

namespace App\Http\Controllers\Admin\Usuario;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class UsuarioController extends Controller
{

    /*    public function __construct()
    {
    $this->middleware('api');
    } */

    public function index(Request $request)
    {

/*         $this->authorize('indexUsuario', User::class); */
        $search = $request->search;

        $users = User::where(DB::raw("CONCAT(users.name,' ',users.email)"), "like", "%" . $search . "%")

            ->orderBy("id", "desc")
        /*    ->whereHas("roles", function ($q) {
        $q->where("name", "not like", "%DOCTOR%");
        }) */
            ->get();

        return response()->json([
            "users" => UserCollection::make($users),
        ]);
    }

    public function config()
    {

        $roles = Role::all();

        return response()->json([
            "roles" => $roles,
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /*    $this->authorize('create', User::class); */

        $users_is_valid = User::where("email", $request->email)->first();

        if ($users_is_valid) {
            return response()->json([
                "message" => 403,
                "message_text" => "EL USUARIO CON ESTE EMAIL YA EXISTE",
            ]);
        }

        if ($request->hasFile("imagen")) {
            $path = Storage::putFile("staffs", $request->file("imagen"));
            $request->request->add(["avatar" => $path]);
        }

        if ($request->password) {
            $request->request->add(["password" => bcrypt($request->password)]);
        }
        // "Fri Oct 08 1993 00:00:00 GMT-0500 (hora estándar de Perú)"
        // Eliminar la parte de la zona horaria (GMT-0500 y entre paréntesis)
        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->birth_date);

        $request->request->add(["birth_date" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);

        $user = User::create($request->all());

        $role = Role::findOrFail($request->role_id);
        $user->assignRole($role);
        return response()->json([
            "message" => 200,
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        /* $this->authorize('view', User::class); */

        $user = User::findOrFail($id);

        return response()->json([
            "user" => UserResource::make($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        /*   $this->authorize('update', User::class); */

        $users_is_valid = User::where("id", "<>", $id)->where("email", $request->email)->first();

        if ($users_is_valid) {
            return response()->json([
                "message" => 403,
                "message_text" => "EL USUARIO CON ESTE EMAIL YA EXISTE",
            ]);
        }

        $user = User::findOrFail($id);

        if ($request->hasFile("imagen")) {
            if ($user->avatar) {
                Storage::delete($user->avatar);
            }
            $path = Storage::putFile("staffs", $request->file("imagen"));
            $request->request->add(["avatar" => $path]);
        }

        if ($request->password) {
            $request->request->add(["password" => bcrypt($request->password)]);
        }

        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->birth_date);

        $request->request->add(["birth_date" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);

        // $request->request->add(["birth_date" => Carbon::parse($request->birth_date, 'GMT')->format("Y-m-d h:i:s")]);
        $user->update($request->all());

        if ($request->role_id != $user->roles()->first()->id) {
            $role_old = Role::findOrFail($user->roles()->first()->id);
            $user->removeRole($role_old);

            $role_new = Role::findOrFail($request->role_id);
            $user->assignRole($role_new);
        }
        return response()->json([
            "message" => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        /*    $this->authorize('delete', User::class); */

        $user = User::findOrFail($id);
        if ($user->avatar) {
            Storage::delete($user->avatar);
        }
        $user->delete();
        return response()->json([
            "message" => 200,
        ]);
    }
}