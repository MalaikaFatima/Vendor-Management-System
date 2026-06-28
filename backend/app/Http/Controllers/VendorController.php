<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class VendorController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Vendor::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('vendor_name', 'LIKE', "%{$search}%")
                  ->orWhere('company_name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%");
        }

        if ($request->has('status') && $request->status != 'all') {
            $query->where('status', $request->status);
        }

        $vendors = $query->latest()->paginate(10);

        return response()->json([
            'status' => true,
            'message' => 'Vendors fetched successfully',
            'data' => $vendors
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'vendor_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email|unique:vendors,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $vendor = Vendor::create($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Vendor created successfully',
            'data' => $vendor
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json([
                'status' => false,
                'message' => 'Vendor not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Vendor fetched successfully',
            'data' => $vendor
        ]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json([
                'status' => false,
                'message' => 'Vendor not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'vendor_name' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|email|unique:vendors,email,' . $id,
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $vendor->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Vendor updated successfully',
            'data' => $vendor
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json([
                'status' => false,
                'message' => 'Vendor not found'
            ], 404);
        }

        $vendor->delete();

        return response()->json([
            'status' => true,
            'message' => 'Vendor deleted successfully'
        ]);
    }

    public function pendingVendors(): JsonResponse
    {
        $vendors = Vendor::where('status', 'pending')->get();

        return response()->json([
            'status' => true,
            'data' => $vendors
        ]);
    }
    public function approveVendor(string $id): JsonResponse
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json([
                'status' => false,
                'message' => 'Vendor not found'
            ], 404);
        }

        $vendor->status = 'active';
        $vendor->save();

        User::where('id', $vendor->user_id)->update(['status' => 'active']);

        return response()->json([
            'status' => true,
            'message' => 'Vendor approved successfully',
            'data' => $vendor
        ]);
    }
    public function rejectVendor(string $id): JsonResponse
    {
        $vendor = Vendor::find($id);

        if (!$vendor) {
            return response()->json([
                'status' => false,
                'message' => 'Vendor not found'
            ], 404);
        }

        $vendor->status = 'rejected';
        $vendor->save();
User::where('id', $vendor->user_id)->update(['status' => 'rejected']);

        return response()->json([
            'status' => true,
            'message' => 'Vendor rejected successfully',
            'data' => $vendor
        ]);
    }
}