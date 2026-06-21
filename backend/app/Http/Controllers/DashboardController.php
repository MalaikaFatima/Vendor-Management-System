<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\Quotation;
use App\Models\Quote;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $totalVendors = Vendor::count();
        $totalQuotations = Quotation::count();
        $pendingQuotations = Quotation::where('status', 'pending')->count();
        $approvedQuotations = Quotation::where('status', 'approved')->count();
        $activeQuotations = Quotation::whereIn('status', ['pending', 'approved'])->count();

        $recentActivities = collect();

        $recentVendors = Vendor::latest()->take(5)->get()->map(function ($vendor) {
            return [
                'type' => 'vendor_added',
                'message' => "Vendor \"{$vendor->vendor_name}\" added",
                'time' => $vendor->created_at->diffForHumans()
            ];
        });

        $recentQuotations = Quotation::latest()->take(5)->get()->map(function ($quotation) {
            return [
                'type' => 'quotation_created',
                'message' => "Quotation \"{$quotation->title}\" created",
                'time' => $quotation->created_at->diffForHumans()
            ];
        });

        $recentQuotes = Quote::with(['quotation', 'vendor'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($quote) {
                return [
                    'type' => 'quote_submitted',
                    'message' => "Quote submitted by {$quote->vendor->vendor_name} for {$quote->quotation->title}",
                    'time' => $quote->created_at->diffForHumans()
                ];
            });

        $recentActivities = $recentVendors
            ->concat($recentQuotations)
            ->concat($recentQuotes)
            ->sortByDesc('time')
            ->take(10)
            ->values();

        return response()->json([
            'status' => true,
            'message' => 'Dashboard data fetched successfully',
            'data' => [
                'stats' => [
                    'total_vendors' => $totalVendors,
                    'total_quotations' => $totalQuotations,
                    'active_quotations' => $activeQuotations,
                    'pending_quotations' => $pendingQuotations,
                    'approved_quotations' => $approvedQuotations,
                ],
                'recent_activities' => $recentActivities
            ]
        ]);
    }
}