<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function index(): Response
    {
        $data = Department::all();
        $formattedData = [];
        foreach ($data as $item) {
            $formattedData[] = [
                'id' => $item->id,
                'parent' => $item->parent_id ?: '#',
                'text' => $item->dept_name,
            ];
        }

        $users = DB::table('users')->paginate(10);
        return Inertia::render('Organization/Department', [
            'formattedData' => $formattedData,
            'users' => $users
        ]);
    }
}
