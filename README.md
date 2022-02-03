# TaskTracker
Task tracker project using ReactJS and Spring Boot. The deployment branch is the one used for the live version at heroku.

## Requirements
- Java Runtime Version 11
- NPM 6.14.10
- Apache Maven 3.8.4
- PostgreSQL 14.1

## Starting the app on pc (checkout the live version on heroku at https://spretasktracker.herokuapp.com/)
### Open command line and 
- go into \api\src\main\app\ and open the file package.json edit the "proxy" field to be localhost:8080
- package the app with maven
- go into the api/target folder
- Run the app with java -jar ./user-0.0.1-SNAPSHOT.jar (or whatever the file is named)
- You should now be able to access the app from the browser or the api from postman.

### api port: localhost:8080
<s>### react port: localhost:3000</s>

## Default login credentials:
- username: user
- password: password



## (* Update) now there's a form to register
## To register a new user you can use the API sending a JSON to /api/register with the fields:
- username
- email
- password

<s>### ~~There's no interface to register, you can do it through Postman~~</s>

Then you can login either via postman on port 8080 or through localhost:3000 on the browser
When logged in through postman, the api will send back a Bearer token, set that Authorization on every other request through postman

## Supported API endpoints through port 8080:
- /api/register [POST]
- /api/login [POST]
- /api/tasks [POST] [GET]
- /api/tasks/{taskId}  [GET] [PUT]



### (* Update) now each task has it's own form. The form's display toggles with the edit button.
## How to edit a task
<s>~~To edit a task, you need to place the new data into the AddTask form and then click on the Edit button of the task you want to edit~~</s>

### (* Update) the design has been updated a little bit
## Front view
![img](https://github.com/mnfalcon/TaskTracker/blob/master/login.png?raw=true)
![im2](https://github.com/mnfalcon/TaskTracker/blob/master/home.png?raw=true)
