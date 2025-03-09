<?php

namespace App\Http\Controllers;

use App\Models\Designation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DesignationController extends Controller
{
    // public function index(): Response
    // {
    //     return Inertia::render('Organization/Designation');
    // }

    public function index(Request $request)
    {
        $query = Designation::query();

        // Apply search filter
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // Apply sorting
        if ($request->filled('sortField') && $request->filled('sortOrder')) {
            $query->orderBy($request->sortField, $request->sortOrder);
        }

        $designations = $query->paginate(10);

        return Inertia::render('Organization/Designation', [
            'designations' => $designations, // Change 'users' to 'designations'
            'filters' => $request->only(['search', 'sortField', 'sortOrder']),
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:designations,position',
        ]);

        Designation::create([
            'position' => ucwords($request->name),
            'description' => $request->description
        ]);

        return response()->json(['success' => 'Designation created successfully.']);

    }

}
