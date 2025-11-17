<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('register_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->smallInteger('generation_year');
            $table->integer('usage');
            $table->integer('usage_total');
            $table->boolean('is_activated');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('register_codes');
    }
};
