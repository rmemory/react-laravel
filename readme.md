# Introduction

This project provides an example of how to use Laravel with React

#ToDos

* Move at least some of the context, such as errors to the top
level component and create a context, with appropriate setters

* Move each card into its own separate component

* Implement login as a modal

* Create index page for users

* Implement pagination for recent posts card

* Users show as currently implemented sucks

* Implement truely API routes as APIs

* Implement React routing for routes that can be done on client

# Setup

This project demonstrates an example of using React with Laravel.

Initial project creation and commit to github
```
$ composer create-project --prefer-dist laravel/laravel react-laravel
$ cd react-laravel/
$ git init
$ git remote add origin git@github.com:rmemory/react-laravel.git
$ git add -A .
$ git commit -m "Initial commit"
$ git push -u origin master
```

Set up Apache
```
$ sudo cp /etc/apache2/sites-available/template.conf /etc/apache2/sites-available/react-laravel.conf
$ sudo gedit /etc/apache2/sites-available/react-laravel.conf # Point at project location
$ sudo vi /etc/hosts # Add IP address for react-laravel
$ touch storage/logs/laravel.log
$ chmod -R 777 storage/
$ sudo a2ensite react-laravel.conf
$ sudo systemctl reload apache2
<edit .env file, and create database in mysql>
```

Add Laravel authentication framework and laravel's preset for React
```
$ php artisan make:auth
$ php artisan preset react
$ npm install & npm run dev
$ git add -A .
$ git commit -m "Add auth and react"
$ git push -u origin master
$ php artisan migrate
```

# Notes

When creating a foreign key, do the following:

```
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id')->unsigned();
			$table->string('body', 140);
			$table->timestamps();
		});
		Schema::table('posts', function($table) {
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
		});
    }
```