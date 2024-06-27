<?php

namespace App\Http\Controllers\Api;

use App\Classes\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    private UserRepositoryInterface $userRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
    }
    public function index()
    {
        $data = $this->userRepositoryInterface->getAll();
        return ApiResponseHelper::sendResponse(UserResource::collection($data), '', 200);
    }

    public function store(StoreUserRequest $request)
    {
        $data = [
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => $request->password,

        ];
        DB::beginTransaction();
        try {
            $user = $this->userRepositoryInterface->store($data);
            DB::commit();
            return ApiResponseHelper::sendResponse(new UserResource($user), 'Record created Succesful', 201);
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseHelper::rollback($ex);
        }
    }

    public function show(string $id)
    {
        $user = $this->userRepositoryInterface->getById($id);
        return ApiResponseHelper::sendResponse(new UserResource($user), '', 200);

    }

    public function update(UpdateUserRequest $request, string $id)
    {

        $data = [
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => $request->password,

        ];
        DB::beginTransaction();
        try {
            $this->userRepositoryInterface->update($data, $id);
            DB::commit();
            return ApiResponseHelper::sendResponse(null, 'Record updated Succesful', 200);
        } catch (\Exception $ex) {
            DB::rollBack();
            return ApiResponseHelper::rollback($ex);
        }

    }

    public function destroy(string $id)
    {
        $this->userRepositoryInterface->delete($id);
        return ApiResponseHelper::sendResponse(null, 'Record deleted Succesful', 200);

    }
}
