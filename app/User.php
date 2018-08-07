<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

use App\Post;

class User extends Authenticatable
{
	use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'username', 'email', 'password',
	];
	
	// required to enable the getAvatarAttribute api
	protected $appends = ['avatar'];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password', 'remember_token',
	];
	
	public function posts() {
		return $this->hasMany(Post::class);
	}

	public function following() {
		/* A reference to another User. So we refer to the 'follows' table, to
		   see if current user (user_id) is following another user
		   (follower_id) All users can refer to many other users. */
		return $this->belongsToMany('App\User', 
									'follows', 
									'user_id', 
									'following_user_id');
	}

	// A helper function to see if the user passed in is the current user
	public function isTheCurrentUser(User $user) {
		return $this->id === $user->id;
	}

	public function isAlreadyFollowing(User $user) {
		// Returns true if count is > 0, or false if count is 0
		if ($this->following->where('id', $user->id)->count() > 0) {
			return true;
		} else {
			return false;
		}
	}

	public function canFollow(User $user) {
		if ($this->isTheCurrentUser($user)) {
			// we can't follow ourselves
			return false;
		}

		// If we are not already following return true
		return !$this->isAlreadyFollowing($user);
	}

	public function canUnfollow(User $user) {
		return $this->isAlreadyFollowing($user);
	}
 
	public function getAvatar() {
		return 'https://gravatar.com/avatar/'.md5($this->email).'/?s=45&d=mm';
	}

	public function getAvatarAttribute() {
		return $this->getAvatar();
	}

	public function getRouteKeyName() {
		return 'username';
	}
}
