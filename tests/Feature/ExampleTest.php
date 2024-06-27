<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     * @test
     */
    public function retornar_estadoexitoso(): void
    {

        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
