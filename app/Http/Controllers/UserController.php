<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

class UserController extends Controller
{
	public function index() {
		// TBD
		return ('home');
	}

	public function show(User $user) {
		return view('users.show', compact('user'));
	}

	// $request contains the currently logged in user
	// $user contains the user we are trying to follow
	public function follow(Request $request, User $user) {
		// first check if the logged in user can follow
		if ($request->user()->canFollow($user)) {
			// Attach the follower's user id to logged in user
			$request->user()->following()->attach($user->id);
		}
		return redirect()->back();
	}

	public function unfollow(Request $request, User $user) {
		// first check if the logged in user can follow
		if ($request->user()->canUnfollow($user)) {
			// Attach the follower's user id to logged in user
			$request->user()->following()->detach($user->id);
		}
		return redirect()->back();
	}
}
