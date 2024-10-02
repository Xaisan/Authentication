### Registering a User
# User Registration API

Registers a new user account. The request must include a username, password, and email address. The username and email address must be unique. The password must meet the following complexity requirements:
- At least 8 characters long
- Contains at least one uppercase letter
- Contains at least one lowercase letter
- Contains at least one number
- Contains at least one special character

## Request

```http
POST /register
Content-Type: application/json

{
    "username": "user",
    "password": "password",
    "email": "user@example.com"
}
```

> **Note:** The password will not be stored in the database as plain text. Instead, it will be hashed using the bcrypt library or a similar library. The hashed password will be stored in the database.

## Response

### Success

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "message": "User registered successfully"
}
```

### Username or Email Already Exists

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "message": "User already exists"
}
```

### Invalid Password

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "message": "The password complexity requirements are not met. The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
}
```