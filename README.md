# Authentication Microservice

The authentication microservice is responsible for managing the authentication of users. It handles the following tasks:
- Registering users
- Authenticating users
- Logging out users
- Resetting user passwords
- Updating user information
- Deleting user accounts
- Managing user roles/permissions
- Managing user sessions
- Managing user tokens

The microservice communicates with the database management microservice directly or through the API Gateway using HTTP requests. It is written in Node.js and uses the Express.js framework.

## API Documentation

[Registering a User](docs/register.md)
[Authenticating a User](docs/authenticate.md)
[Logging Out a User](docs/logout.md)
[Resetting a User's Password](docs/reset-password.md)
[Updating User Information](docs/update.md)
[Deleting a User Account](docs/delete.md)
[Managing User Roles/Permissions](docs/roles.md)
[Managing User Sessions](docs/sessions.md)
[Managing User Tokens](docs/tokens.md)

