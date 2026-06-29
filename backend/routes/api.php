<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Api\AuthController;


Route::apiResource('vendors', VendorController::class);
Route::get('vendors/pending', [VendorController::class, 'pendingVendors']);

Route::patch('vendors/{id}/approve', [VendorController::class, 'approveVendor']);

Route::patch('vendors/{id}/reject', [VendorController::class, 'rejectVendor']);

Route::apiResource('quotations', QuotationController::class);
Route::middleware('auth:sanctum')->group(function () {

    Route::post('quotes', [QuoteController::class, 'store']);

});
Route::get('quotations/{id}/quotes', [QuoteController::class, 'getQuotesByQuotation']);
Route::get('quotations/{id}/compare', [QuoteController::class, 'compareQuotes']);
Route::patch('quotes/{id}/status', [QuoteController::class, 'updateStatus']);
Route::delete('quotes/{id}', [QuoteController::class, 'destroy']);

Route::patch('quotations/{id}/status', [QuotationController::class, 'updateStatus']);



Route::get('dashboard', [DashboardController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('history',[QuoteController::class,'history']);

Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);