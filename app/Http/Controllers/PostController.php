<?php

namespace App\Http\Controllers;

use App\Http\Responses\AjaxResponse;
use App\Post;

use Illuminate\Http\Request;

use Validator;
use Log;

class PostController extends Controller
{
	public function create(Request $request, Post $post) {
		$data = request()->all();
		// Log::info('posts create:'.print_r($data, true));

		$response = app(AjaxResponse::class);

		$rules = [
			'body' => 'required|string|min:1|max:140',
		];

		// Don't call the validator yet: $this->validate(request(), $rules);

		// Set up validator with initial rules, call validate below
		$validator = Validator::make($data, $rules);

		// Additional validation (if any) goes here
		$validator->after(function ($validator) use($data) {
			$testErrors = false;

			// Currently no additional validation to perform
			if ($testErrors) {
				$validator->errors()->add('SomeField', 'Some failure message');
			} 
			
			if ($testErrors) {
				$validator->errors()->add('SomeOtherField', 'Some other failure message');
			}
		});//Don't call the validator yet: ->validate();

		// Perform the validation
		if ($validator->fails()) {
			Log::info('posts create errors:'.print_r($validator->errors(), true));
			
			//pass validator errors as errors object for ajax response
			return $response->validation(['errors'=>$validator->errors()]);
		}

		// Validation is happy, create the post
		$createdPost = $request->user()->posts()->create([
			'body' => $data['body'],
		]);

		return response()->json($post->with('user')->find($createdPost->id));
	}
}
