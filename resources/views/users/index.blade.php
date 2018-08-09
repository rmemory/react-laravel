@extends('layouts.app')

@section('content')
<div class="container">
	<h2 class="text-primary">{{ $user->username }}</h2>
	<hr>
	@if(!Auth::user()->isTheCurrentUser($user))
		@if(Auth::user()->isAlreadyFollowing($user))
			<a href="{{ action('UserController@unfollow', compact('user')) }}" class="btn btn-primary">Unfollow</a>
		@else
			<a href="{{ action('UserController@follow', compact('user')) }}" class="btn btn-success">Follow</a>
		@endif
	@endif
	<br><br>
	@foreach($user->posts as $post)
	<div>
		<div class="lead">{{ $post->body }}</div>
		<div class="text-muted">{{ $post->humanCreatedAt }}</div>
		<hr>
	</div>
	@endforeach

</div>
@endsection