@extends('layouts.app')

@section('content')
<div class="container">
	{{-- React main application is mounted here --}}
	<div id="main"></div>

	<hr>

	<div class="row justify-content-center">
		<div class="col-md-6">
			<div class="card">
				<div class="card-header bg-info font-weight-bold">People I am following...</div>
				@if (count($following) > 0)
					<div class="card-body">
						<ul class="list-group">
							@foreach($following as $user)
								<li class="list-group-item">
									<a href="{{ action('UserController@show', compact('user')) }}">{{ $user->username }}</a>
								</li>
							@endforeach
						</ul>
					</div>
				@endif
			</div>
		</div>

		<div class="col-md-6">
			<div class="card">
				<div class="card-header bg-info font-weight-bold">People who follow me...</div>
				@if (count($followers) > 0)
					<div class="card-body">
					<ul class="list-group">
						@foreach($followers as $user)
							<li class="list-group-item">
								<a href="{{ action('UserController@show', compact('user')) }}">{{ $user->username }}</a>
							</li>
						@endforeach
					</ul>
					</div>
				@endif
			</div>
		</div>
	</div>
</div>
@endsection
