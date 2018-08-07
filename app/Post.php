<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\User;

class Post extends Model
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'body'
	];

	protected $appends = ['humanCreatedAt'];
	
	public function user() {
		return $this->belongsTo(User::class);
	}

	public function getHumanCreatedAtAttribute() {
		return $this->created_at->diffForHumans();
	}
}
