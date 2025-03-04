# API

To run this api for testing purposes, open a console window, go to the /src/api directory,
then type
  ```bash
    node api
  ```
The console window needs to stay open during testing. You can stop the api with CTRL+C.

Currently the api listens on port 30000, so you can query it with http://localhost:30000/api
as an example. 

Please store the host portion of the api url in a variable so you can easily change it once 
it is properly deployed.

# API Endpoints

## GET /api

### Description
Retrieve detailed information about the api.

### Responses
- **200 OK**: Returns user information.
  ```json
  {
    "version": "0.0.1", 
    "name": "api", 
    "description": "API for the application"
  }
  ```


## POST /login

### Description
Send credentials to be verified against existing users.

### Request
  ```json
  {
    "email": "test@email.com",
    "password": "changeme"
  }
  ```

### Responses
- **200 OK**: Returns user_id on successful login
- **401 Unauthorized**: Password is incorrect!
- **404 Not Found**: User not found!
- **500 Internal Server Error**: Internal server error occured.

## POST /register

### Description
Creates a user with the provided credentials and data.

### Request
  ```json
  {
    "email": "test@email.com",
    "password": "changeme",
    "surname": "Doe",
    "first_name": "John"
  }
  ```

### Responses
- **201 Created**: User created!
- **403 Forbidden**: Maximum number of users reached!
- **409 Conflict**: User already exists!
- **500 Internal Server Error**: Internal server error occured.


## GET /user/{id}

### Description
Retrieve detailed information about a user by their unique ID.

### Parameters
- **id** (number, required): The unique identifier of the user.

### Responses
- **200 OK**: Returns user information.
  ```json
  {
    "user_id": "1",
    "surname": "Doe",
    "first_name": "John",
    "games": []
  }
  ```
- **404 Not Found**: User doesnt exist! / User not fully initialized!
- **500 Internal Server Error**: Internal server error occured.

## PUT /user/{id}

### Description
Updates the information of the user with the given ID. The given json
is validated against the scheme defined in /src/json/schema/json-schema.json.

### Parameters
- **id** (number, required): The unique identifier of the user. Needs to match
the id in the given json.

### Request
  ```json
  {
    "user_id": "1",
    "surname": "Doe",
    "first_name": "John",
    "games": []
  }
  ```

### Responses
- **200 OK**: User updated!
- **400 Bad Request**: Invalid JSON data! / User ID doesn't match!
- **404 Not Found**: User doesnt exist!
- **500 Internal Server Error**: Internal server error occured.

## DELETE /user/{id}

### Description
Deletes the user with the given ID.

### Parameters
- **id** (number, required): The unique identifier of the user. Needs to match
the id in the given json.

### Responses
- **200 OK**: User deleted!
- **404 Not Found**: User doesnt exist!
- **500 Internal Server Error**: Internal server error occured.

