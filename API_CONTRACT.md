# API Contract

This document defines the API contract for the Suar service.

## Endpoints

### Authentication

#### Register

- **Endpoint:** `POST /api/v1/auth/register`
- **Description:** Registers a new user.
- **Request:**
  - **Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Response (Success):**
  - **Status:** `201 Created`
  - **Body:**
    ```json
    {
      "id": "integer",
      "username": "string",
      "email": "string",
      "created_at": "timestamp"
    }
    ```
- **Response (Error):**
  - **Status:** `400 Bad Request` (Invalid payload or validation failed)
  - **Status:** `409 Conflict` (Email or username already taken)
  - **Status:** `500 Internal Server Error` (Failed to register user)

#### Login

- **Endpoint:** `POST /api/v1/auth/login`
- **Description:** Logs in a user and returns a JWT token.
- **Request:**
  - **Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
- **Response (Success):**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "access_token": "string",
      "token_type": "string"
    }
    ```
- **Response (Error):**
  - **Status:** `400 Bad Request` (Invalid payload or validation failed)
  - **Status:** `401 Unauthorized` (Invalid credentials)
  - **Status:** `500 Internal Server Error` (Failed to login)

### API Request

- **Endpoint:** `POST /api/v1/auth/request`
- **Description:** Makes a request to a specified URL on behalf of the user.
- **Request:**
  - **Body:**
    ```json
    {
      "method": "string",
      "url": "string",
      "headers": {
        "key": ["value"]
      },
      "body": "json_raw_message",
      "timeout": "integer"
    }
    ```
- **Response (Success):**
  - **Status:** `200 OK`
  - **Body:**
    ```json
    {
      "status_code": "integer",
      "duration": "integer",
      "timestamp": "timestamp",
      "size": "integer",
      "headers": {
        "key": ["value"]
      },
      "body": "byte_array"
    }
    ```
- **Response (Error):**
  - **Status:** `400 Bad Request` (Invalid JSON format, validation failed, or invalid input)
  - **Status:** `405 Method Not Allowed` (Invalid request method)
  - **Status:** `504 Gateway Timeout` (Request timeout)
  - **Status:** `500 Internal Server Error` (An internal error occurred)
