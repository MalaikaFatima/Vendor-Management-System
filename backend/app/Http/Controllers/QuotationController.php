<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class QuotationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Quotation::query();

        if ($request->has('status') && $request->status != 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
        }

        $quotations = $query->with('quotes.vendor')->latest()->paginate(10);

        return response()->json([
            'status' => true,
            'message' => 'Quotations fetched successfully',
            'data' => $quotations
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $quotation = Quotation::create($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Quotation created successfully',
            'data' => $quotation
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $quotation = Quotation::with(['quotes.vendor'])->find($id);

        if (!$quotation) {
            return response()->json([
                'status' => false,
                'message' => 'Quotation not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Quotation fetched successfully',
            'data' => $quotation
        ]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $quotation = Quotation::find($id);

        if (!$quotation) {
            return response()->json([
                'status' => false,
                'message' => 'Quotation not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $quotation->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Quotation updated successfully',
            'data' => $quotation
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $quotation = Quotation::find($id);

        if (!$quotation) {
            return response()->json([
                'status' => false,
                'message' => 'Quotation not found'
            ], 404);
        }

        $quotation->delete();

        return response()->json([
            'status' => true,
            'message' => 'Quotation deleted successfully'
        ]);
    }

    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $quotation = Quotation::find($id);

        if (!$quotation) {
            return response()->json([
                'status' => false,
                'message' => 'Quotation not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,approved,rejected'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $quotation->update(['status' => $request->status]);

        return response()->json([
            'status' => true,
            'message' => 'Quotation status updated successfully',
            'data' => $quotation
        ]);
    }
}