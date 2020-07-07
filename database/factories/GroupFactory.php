<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Person;
use Faker\Generator as Faker;

$factory->define(Person::class, function (Faker $faker) {
    return [
        'group_name' => $faker->groupName,
    ];
});
