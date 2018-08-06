<?php 

namespace App\Http\Responses;

use Response;

class AjaxResponse
{
	public $http_code = 201;
	public $message = '';
	public $payload;
	public $errors = [];
	public $redirect;

	public function __construct($response_code = 200, $message = '')
	{
		$this->http_code = $response_code;
		$this->message = $message;
	}

	public function success($payload = [])
	{
		$this->http_code = 200;
		$this->success = true;
		$this->payload = $payload;
		return response()->json($this, $this->http_code);
	}

	public function validation($errors = [])
	{
		$this->http_code = 422;
		$this->success = false;
		// $this->errors = $errors;
		return response()->json($errors, $this->http_code);
	}

	public function error($payload = [])
	{
		$this->http_code = 400;
		$this->success = false;
		$this->payload = $payload;
		return response()->json($this, $this->http_code);
	}

	public function unauthorized($payload = [])
	{
		$this->http_code = 401;
		$this->success = false;
		$this->payload = $payload;
		return response()->json($this, $this->http_code);
	}

	public function server($payload = [])
	{
		$this->http_code = 500;
		$this->success = false;
		$this->payload = $payload;
		return response()->json($this, $this->http_code);
	}

	public function setMessage($message = "")
	{
		$this->message = $message;
		return $this;
	}

	public function setRedirect($redirect = "")
	{
		$this->redirect = $redirect;
		return $this;
	}
}