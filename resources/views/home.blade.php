@extends('layouts.app')

@section('content')
<div class="container">
	{{-- React main application is mounted here --}}
	<div id="main"></div>
	<hr>

	@if (count($following) > 0) 
		<h2>Following</h2>

		@foreach($following as $user)
			<p><a href="{{ action('UserController@show', compact('user')) }}">{{ $user->username }}</a></p>
		@endforeach
	@endif

	@if (count($followers) > 0)
		<hr>
		<h2>Followers</h2>

		@foreach($followers as $user)
			<p><a href="{{ action('UserController@show', compact('user')) }}">{{ $user->username }}</a></p>
		@endforeach
	@endif
</div>
@endsection
