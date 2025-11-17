<?php

namespace App\Services\Admin;

use App\Models\RegisterCode;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class RegisterCodeService
{
    public function add_code(array $data)
    {
        $random_str = $plainPassword = Str::password(6, true, false, false, false);
        $angkatan = $data['generation_year'];
        $code = RegisterCode::create([
            'code' => $random_str . $angkatan ,
            'usage_total' => $data['usage_total'],
            'generation_year' => $angkatan,
            'usage' => 0,
            'is_activated' => 1,
        ]);
        return $code;
    }

    public function delete_code($id) {

    }

    public function activate_deactivate_code($id) {

    }

    public function check_full_usage($id) {

    }

    public function check_is_year_available($year) {
        $code = RegisterCode::where('generation_year',$year)->first();
        if ($code) {
            return true;
        }
        return false;
    }

    public function get_all() {
        $codes = RegisterCode::all();
        return $codes;
    }
}
