# Introduction

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
