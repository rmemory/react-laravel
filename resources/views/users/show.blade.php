@extends('layouts.app')

@section('content')
<div class="container">
	{{ $user->username }}

	@if(!Auth::user()->isTheCurrentUser($user))
		@if(Auth::user()->isAlreadyFollowing($user))
			<a href="{{ action('UserController@unfollow', ['username' => $user->username]) }}">Unfollow</a>
		@else 
			<a href={{ action('UserController@follow', ['username' => $user->username]) }}>Follow</a>
		@endif
	@endif
</div>
@endsection