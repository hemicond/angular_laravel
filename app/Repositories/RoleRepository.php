<?php

namespace App\Repositories;

use App\Interfaces\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepositoryInterface
{
    public function getAll( /* $perPage,
$search,
$sortField,
$sortDirection */)
    {

        /*   $query = Role::query();

        if ($search) {
        $query->where('name', 'like', '%' . $search . '%')
        ->orWhere('description', 'like', '%' . $search . '%');
        }

        return $query->orderBy($sortField, $sortDirection)
        ->paginate($perPage);
         */
        return Role::all();

    }

    public function getById($id)
    {
        return Role::findOrFail($id);
    }
    public function store(array $data)
    {
        return Role::create($data);
    }
    public function update(array $data, $id)
    {
        return Role::whereId($id)->update($data);
    }

    public function delete($id)
    {
        return Role::destroy($id);
    }
}
