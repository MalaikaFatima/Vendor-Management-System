<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\DashboardController;

Route::apiResource('vendors', VendorController::class);
Route::apiResource('quotations', QuotationController::class);

Route::post('quotes', [QuoteController::class, 'store']);
Route::get('quotations/{id}/quotes', [QuoteController::class, 'getQuotesByQuotation']);
Route::get('quotations/{id}/compare', [QuoteController::class, 'compareQuotes']);
Route::patch('quotes/{id}/status', [QuoteController::class, 'updateStatus']);
Route::delete('quotes/{id}', [QuoteController::class, 'destroy']);

Route::patch('quotations/{id}/status', [QuotationController::class, 'updateStatus']);

Route::get('dashboard', [DashboardController::class, 'index']);