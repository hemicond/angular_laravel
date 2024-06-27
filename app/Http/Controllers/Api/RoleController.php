<?php

namespace App\Http\Controllers\Api;

use App\Classes\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\Role\RoleResource;
use App\Interfaces\RoleRepositoryInterface;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    private RoleRepositoryInterface $roleRepositoryInterface;

    public function __construct(RoleRepositoryInterface $roleRepositoryInterface)
    {
        $this->roleRepositoryInterface = $roleRepositoryInterface;
    }
    public function index()
    {
        /* $perPage = request('per_page', 100);
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc'); */

        $data = $this->roleRepositoryInterface->getAll(
            /*  $perPage,
        $search,
        $sortField,
        $sortDirection */);

        return ApiResponseHelper::sendResponse(RoleResource::collection($data), '', 200);
    }

    public function store(Request $request)
    {
        //
        $is_role = Role::where("name", $request->name)->first();
        if ($is_role) {
            return response()->json([
                "message" => 403,
                "message_text" => "EL NOMBRE DEL ROL YA EXISTE",
            ]);

        }
        $role = Role::create([
            'guard_name' => 'api',
            'name' => $request->name,
        ]);
        foreach ($request->permisions as $key => $permision) {
            $role->givePermissionTo($permision);
        }
        return response()->json([
            "message" => 200,

        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::findOrFail($id);
return response()->json(
    [
        "id" => $role->id,
        "name" => $role->name,
        "permision" => $role->permissions,
        "permision_pluck" => $role->permissions->pluck("name"),
        "created_at" => $role->created_at->format("Y-m-d h:i:s"),
    ]

);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
