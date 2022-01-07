# TaskTracker
Task tracker project using ReactJS and Spring Boot

## Requirements
Java Runtime Version 11
NPM 6.14.10
Apache Maven 3.8.4
PostgreSQL 14.1

Default login credentials:
- username: user
- password: password

To register a new user you can use the API sending a JSON to /api/register with the fields:
- username
- email
- password

There's no interface to register, you can do it through Postman

Then you can login either via postman or through localhost:3000
When logged in through postman, the api will send back a Bearer token, set that Authorization on every other request through postman

Supported API endpoints through port 8080:
/api/register [POST]
/api/login [POST]
/api/tasks [POST] [GET]
/api/tasks/{taskId} [POST] [GET] [PUT]

To edit a task, you need to place the new data into the AddTask form and then click on the Edit button of the task you want to edit
