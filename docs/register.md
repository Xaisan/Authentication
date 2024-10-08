### Registering a User
# User Registration API

Registers a new user account. The username and email address must be unique. The password must meet the following complexity requirements:
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
    "email": "user@example.com",
    "displayName": "User", // Used for display purposes like in the corner of the screen or in the header
    "role": "user" // The roles can be 'user', 'admin', 'superadmin'
}
```
> **Note:** The password will not be stored in the database as plain text. Instead, it will be hashed using the bcrypt library or a similar library. This process converts the password into a secure hash that cannot be easily reversed.

Roles explanation:
- `user` - a regular user with basic permissions (default)
- `admin` - an administrator with elevated permissions that can manage other users and that can acces developer tools
- `superadmin` - a super administrator like the default admin user that can manage all users and all the system settings. This role can only be assigned by another superadmin and the default superadmin user can't be deleted or have its role changed because it is not present in the user list (database) but hardcoded in the system settings.

> **Note:** The default `superadmin` user will be defined using environment variables. The variables are `SUPERADMIN_USERNAME`, `SUPERADMIN_PASSWORD`, `SUPERADMIN_EMAIL`, and `SUPERADMIN_DISPLAY_NAME`. If the password needs to be changed, the docker-compose file should be updated with the new password and the container should be recreated. Because of this is strongly recommended to create a new superadmin user as soon as possible to have a backup superadmin user in case the default one is lost and noone has acces to the docker engine at the moment.

## Response

### Success

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "message": "User registered successfully",
    "user": {
        "id": "1234567890",
        "username": "user",
        "email": "",
        "displayName": "User",
        "role": "user"
    }
}
```

### Username or Email Already Exists

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "message": "User/Email already exists"
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

### Other Validation Errors

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "message": "Invalid email format" // or other validation errors if applicable
}
```

## Additional Considerations

### Rate Limiting

If the API has rate limiting, it should be documented here.

### Throttling and Abuse Prevention

Consider adding information about measures to prevent abuse, such as throttling or CAPTCHA, if applicable.