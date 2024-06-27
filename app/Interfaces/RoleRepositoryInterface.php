<?php

namespace App\Interfaces;

interface RoleRepositoryInterface
{
    public function getAll(/* $perPage,
        $search,
        $sortField,
        $sortDirection */);
    public function getById($id);
    public function store(array $data);
    public function update(array $data, $id);
    public function delete($id);
}
