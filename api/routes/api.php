<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamMembershipController;
use App\Http\Controllers\UserAvatarController;
use App\Http\Controllers\UserSettingsController;
use App\Http\Controllers\WalletController;

Route::resource('/user/settings', UserSettingsController::class);
Route::resource('/user/avatar', UserAvatarController::class);
Route::resource('/teams', TeamController::class);
Route::resource('/memberships', TeamMembershipController::class);
Route::resource('/game', GameController::class);
Route::resource('/wallet', WalletController::class);
