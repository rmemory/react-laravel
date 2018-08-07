<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFollowsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('follows', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->integer('following_user_id')->unsigned();
			$table->timestamps();
		});
		
		Schema::table('follows', function($table) {
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->foreign('following_user_id')->references('id')->on('users')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		DB::statement("SET foreign_key_checks=0");
		Schema::dropIfExists('follows');
	}
}
