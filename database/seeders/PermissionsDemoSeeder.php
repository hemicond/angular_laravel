<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsDemoSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions

        Permission::create(['guard_name' => 'api', 'name' => 'dashboard']);

        Permission::create(['guard_name' => 'api', 'name' => 'register_rol']);
        Permission::create(['guard_name' => 'api', 'name' => 'view_rol']);
        Permission::create(['guard_name' => 'api', 'name' => 'edit_rol']);
        Permission::create(['guard_name' => 'api', 'name' => 'delete_rol']);

        Permission::create(['guard_name' => 'api', 'name' => 'register_user']);
        Permission::create(['guard_name' => 'api', 'name' => 'view_user']);
        Permission::create(['guard_name' => 'api', 'name' => 'edit_user']);
        Permission::create(['guard_name' => 'api', 'name' => 'delete_user']);
        Permission::create(['guard_name' => 'api', 'name' => 'profile_user']);

        Permission::create(['guard_name' => 'api', 'name' => 'settings']);

        //create roles and assign existing permissions
        $role1 = Role::create(['guard_name' => 'api', 'name' => 'user']);
        $role1->givePermissionTo('view_user');
        $role1->givePermissionTo('register_user');

        $role2 = Role::create(['guard_name' => 'api', 'name' => 'admin']);
        $role1->givePermissionTo('view_user');
        $role1->givePermissionTo('register_user');
        $role1->givePermissionTo('edit_user');
        $role1->givePermissionTo('delete_user');

        $role2->givePermissionTo('register_rol');
        $role2->givePermissionTo('view_rol');
        $role2->givePermissionTo('edit_rol');
        $role2->givePermissionTo('delete_rol');

        $role3 = Role::create(['guard_name' => 'api', 'name' => 'Super-Admin']);
        // gets all permissions via Gate::before rule; see AuthServiceProvider

        // create demo users
        $user = \App\Models\User::factory()->create([
            'name' => 'Example User',
            'email' => 'user@example.com',
            'password' => bcrypt('123123123'),
        ]);
        $user->assignRole($role1);

        $user = \App\Models\User::factory()->create([
            'name' => 'Example Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('123123123'),
        ]);
        $user->assignRole($role2);

        $user = \App\Models\User::factory()->create([
            'name' => 'Super-Admin User',
            'email' => 'tester@example.com',
            'password' => bcrypt('123123123'),
        ]);
        $user->assignRole($role3);
    }
}
