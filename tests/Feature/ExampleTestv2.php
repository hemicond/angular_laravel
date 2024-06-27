<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTestv2 extends TestCase
{
    /**
     * A basic feature test example.
     * @test
     */
    public function test_example(): void
    {
        $response = $this->get('/api/userss');

        $response->assertStatus(200);
    }
}
