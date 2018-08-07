<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::group(['middleware' => ['auth']], function() {
	Route::get("/", "TimelineController@index");

	Route::get("/users", "UserController@index");
	Route::get("/users/{user}", "UserController@show");
	Route::get("/users/{user}/follow", "UserController@follow");
	Route::get("/users/{user}/unfollow", "UserController@unfollow");

	Route::get("/posts", "PostController@index");
	Route::post("/posts", "PostController@create");
});