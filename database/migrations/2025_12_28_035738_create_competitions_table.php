<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('competitions', function (Blueprint $table) {
            $table->id();
            
            $table->string('name');
            $table->foreignId('competition_type_id')
                  ->constrained('competition_types')
                  ->cascadeOnDelete();

            $table->date('start_date');
            $table->date('end_date');
            $table->dateTime('registration_deadline')->nullable();
            $table->integer('max_participants')->nullable();

            $table->text('description');

            $table->json('prizes')->nullable();        // ["1st: MacBook", "2nd: iPad"]
            $table->json('links')->nullable();         // {"registration": "...", "discord": "..."}
            $table->json('requirements')->nullable();  // ["Must be student", "Portfolio required"]

            $table->string('contact_person')->nullable();
            $table->string('contact_email')->nullable();

            $table->enum('status', ['draft','published','closed'])->default('draft');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('competitions');
    }
};
