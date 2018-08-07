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
