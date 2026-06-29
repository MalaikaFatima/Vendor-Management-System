<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Models\Quotation;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class QuoteController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'quotation_id' => 'required|exists:quotations,id',
            'amount' => 'required|numeric|min:0',
            'delivery_time' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

$vendor= $request->user()->vendor;
if(!$vendor)
{
    return response()->json(['status'=>false,'message'=>'Vendor not found'],404);
}
        $existingQuote = Quote::where('quotation_id', $request->quotation_id)
                              ->where('vendor_id', $vendor->id)
                              ->first();

        if ($existingQuote) {
            return response()->json([
                'status' => false,
                'message' => 'This vendor has already submitted a quote for this quotation'
            ], 409);
        }

        $quote = Quote::create([
            'quotation_id' => $request->quotation_id,
            'vendor_id' => $vendor->id,
            'amount' => $request->amount,
            'delivery_time' => $request->delivery_time,
            'notes' => $request->notes,
            'status' => 'pending',
            'submitted_date' => now(),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Quote submitted successfully',
            'data' => $quote
        ], 201);
    }

    public function getQuotesByQuotation(string $id): JsonResponse
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
            'message' => 'Quotes fetched successfully',
            'data' => $quotation->quotes
        ]);
    }

    public function compareQuotes(string $id): JsonResponse
    {
        $quotation = Quotation::with(['quotes.vendor'])->find($id);

        if (!$quotation) {
            return response()->json([
                'status' => false,
                'message' => 'Quotation not found'
            ], 404);
        }

        $quotes = $quotation->quotes;

        if ($quotes->isEmpty()) {
            return response()->json([
                'status' => true,
                'message' => 'No quotes submitted yet',
                'data' => [
                    'quotation' => $quotation,
                    'quotes' => [],
                    'cheapest' => null,
                    'recommended' => null
                ]
            ]);
        }

        $cheapest = $quotes->sortBy('amount')->first();
        $cheapest->is_cheapest = true;

        $recommended = $cheapest;

        return response()->json([
            'status' => true,
            'message' => 'Comparison data fetched successfully',
            'data' => [
                'quotation' => $quotation,
                'quotes' => $quotes,
                'cheapest' => $cheapest,
                'recommended' => $recommended
            ]
        ]);
    }

    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $quote = Quote::find($id);

        if (!$quote) {
            return response()->json([
                'status' => false,
                'message' => 'Quote not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,reviewed,approved,rejected'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $quote->update(['status' => $request->status]);

        return response()->json([
            'status' => true,
            'message' => 'Quote status updated successfully',
            'data' => $quote
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $quote = Quote::find($id);

        if (!$quote) {
            return response()->json([
                'status' => false,
                'message' => 'Quote not found'
            ], 404);
        }

        $quote->delete();

        return response()->json([
            'status' => true,
            'message' => 'Quote deleted successfully'
        ]);
    }
}