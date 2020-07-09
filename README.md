# Things I Found Interesting
  It was a very fun challenge trying to make all of my requests work for the groups route that I added. What I liked about this coding challenge was how much it required me to think about the prompt without every direction being handed to me. I was getting several 500 errors when I would first try to make a POST request. After lots of diving into the code I discovered the API was expecting certain columns that I was wasn't giving it. 
  
  The backend code was the most interesting to go through, there was so much too it but it all made so much sense. It helped me to see the relationship between the API, Database, and front end and how they all beautifully come together.

  I am very proud of my work. I hope that it speaks for itself, however if you have any questions please don't hesitate to reach out to me at nicopaulino8@gmail.com.
  
# How to Start Application
  1. Download XAMPP (https://www.apachefriends.org/download.html)
  2. Create Database
  3. Add Tables called groups and people into the table
  4. SQL code you can use 
      CREATE TABLE groups (
	      id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
        group_name varchar(255) NOT NULL,
        created_at datetime,
        updated_at datetime
      );
      CREATE TABLE people (
	      id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
        first_name varchar(50) NOT NULL,
        last_name varchar(50) NOT NULL,
        email_address varchar(255) NOT NULL,
        status varchar(8) NOT NULL,
        group_id int,
        created_at datetime,
        updated_at datetime
      );
  5. Follow Excercise Set Up below 
# Coding Exercise

Hello, Nicholas Paulino!

Below is a coding exercise that we believe will allow you to show off your amazing development skills!

We’re super excited to see what you come up with!

We expect it to take a few hours. We would ask that you make commits to a git repository every so often so that we can see how long it took. Here is what you need to do

1. Clone this repository locally and update the first line of this README with your name (so that it reads "Hello, YOUR NAME!"). Commit this change. This will serve as a starting timestamp
2. Complete the exercise below
3. Commit progress regularly
4. When you're done, upload your code to a personal GitHub account and email us the link.

## The Exercise

This is a simplified version of a piece of functionality we have in Breeze ChMS. Many of the churches we work with import their data from an existing system or a homegrown spreadsheet into Breeze. We provide tools for bulk importing of people, contribution, group and attendance records.
In this problem we're only going to consider two data types: People and Groups. A Person can be part of one Group.

For the People data type, each person can have a state of either 'active' or ‘archived’. The `id` for each data type is globally unique. As a result, if the id does not exist, create a new record, otherwise, update the existing record.

People columns:
  `id, first_name, last_name, email_address, status`

Group columns:
  `id, group_name`

Here’s an example:

```
id, first_name, last_name, email_address, status
1, "Alex", "Ortiz-Rosado", "alex@breezechms.com", active
2, "Jon", "VerLee", "jon@breezechms.com", "archived"
3, "Fred", "Flintstone", "fredflintstone@example.com", "active"
4, "Marie", "Bourne", "mbourne@example.com", "active"
5, "Wilma", "Flintstone", "wilmaflinstone@example.com", "active"
```

```
id, group_name
1, "Volunteers"
2, "Elders"
3, "Bible Study"
```

### Exercise Setup Help

*Help getting the code up and running:*

**Prerequisites**
* Git, Composer, Laravel
* Node >= 8, Yarn
* Command Line PHP 7
* MySql 5.x installed locally, accessible via 127.0.0.1

- Clone the repository
  - `git clone git@github.com:BreezeChMS/coding-exercise-api-react.git && cd coding-exercise-api-react`
- Setup Laravel
  - `cp .env.example .env`
  - Edit .env with your mysql connection information: the following steps connect to local mysql database using root credentials
  - `composer install && php artisan key:generate && php artisan migrate`
- Start the Laravel API in one Terminal Window: `php artisan serve`
- Start the React/Node.js server in another Terminal Window: `yarn start`


### Expected Changes

Update this RESTful API (built using the Laravel framework) to add a _new_ endpoint for `/groups`. This endpoint should support CRUD (Create, Read, Update, Delete) operations.

Update the ReactJS  application to receive an uploaded People CSV file, import it using the RESTful API service and display the results on the screen. The same application will allow you to do the same thing for a Group CSV file.

Feel free to use a CSV parsing library.

The data will be displayed in a sortable table.

You will need to determine the type of data in the CSV file based on the headers in the first row. Your program will output a list of Groups, and for each Group, a list of active People in that Group.

### Testing

We love TDD! So we’d love to see tests for the API and ReactJS application. Write automated tests to verify your results and account for gotchas (handling different column orders, invalid id's in the People CSV file, etc..). Classify your tests as either unit, integration, ui, or acceptance, but it is not required to use every type.

## Finally

We’re a fully remote team so communication is really important. Be sure to include any instructions needed for any of our team mates to run and test.

Good luck and we'll get back to you once we review it!
