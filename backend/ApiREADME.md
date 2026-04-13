# Clean2Earn Backend

Spring Boot backend for the Clean2Earn business domain in the hybrid Clean2Earn platform.

Scope of this backend:

- User authentication with JWT
- Email verification with OTP
- Google user provisioning for OAuth-based login
- Cleaning submission persistence
- Reward and coin transaction management
- User dashboard data
- Leaderboard data

Out of scope:

- AI validation logic
- Image upload logic

Node.js is expected to validate the submission first and then call this backend with the validation result.

## Hybrid System Overview

Clean2Earn uses three layers:

- React frontend: UI, user interaction, camera/image selection, token storage, dashboard screens
- Node.js backend: Google OAuth token verification, image upload, AI validation, metadata validation
- Spring Boot backend: user records, JWT issuance, OTP verification, reward logic, submissions, transactions, leaderboard

Recommended request flow:

1. React calls Spring Boot `/api/auth/register`
2. Spring Boot creates local user and sends OTP email
3. React calls Spring Boot `/api/auth/verify-otp`
4. Spring Boot returns JWT
5. React stores JWT and sends it in `Authorization: Bearer <token>`
6. React uploads images to Node.js
7. Node.js uploads images, runs AI validation, and returns validated payload
8. React sends validated payload to Spring Boot `/submissions`
9. Spring Boot stores submission, applies reward rules, and updates coin balance

Recommended Google login flow:

1. React gets Google credential
2. React sends credential to Node.js
3. Node.js verifies Google token and extracts `name`, `email`, `providerId`
4. Node.js or React calls Spring Boot `/api/auth/google`
5. Spring Boot creates or reuses the Google user and returns JWT

## React Integration Guide

React should use Spring Boot for:

- local registration
- OTP verification
- local login
- Google user login after Node.js verifies Google identity
- dashboard, transactions, leaderboard
- final submission persistence after Node.js finishes AI validation

React should keep these values in its auth state:

- `accessToken`
- `tokenType`
- `userId`
- `name`
- `email`
- `role`
- `isVerified`

Recommended frontend route behavior:

- after register: go to OTP verification screen
- after OTP verification: store JWT and redirect to dashboard
- after login: store JWT and redirect to dashboard
- if backend returns `401` for unverified local login: redirect to OTP verification screen

Example auth header from React:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

Example React fetch pattern:

```javascript
const response = await fetch("http://localhost:8080/users/dashboard", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
});
```

## Node.js Integration Guide

Node.js should use Spring Boot for:

- creating Google-backed users after Google token verification
- storing validated submissions
- reading reward data only if your Node.js layer also serves admin/internal flows

Node.js should not reimplement:

- reward calculation
- daily submission limit checks
- daily reward limit checks
- coin updates
- transaction storage

Node.js to Spring Boot contract for submission persistence:

- Node.js must send only already-validated data
- `beforeImageUrl` and `afterImageUrl` must already point to Cloudinary, S3, or another storage layer
- `aiVerdict` should be the final verdict produced by Node.js
- `confidence` must be between `0.0` and `1.0`
- `details` should contain the explanation or metadata summary from validation

Recommended verdict mapping:

- `CLEANED`: reward eligible
- any other value: stored as rejected and no reward is granted

Suggested Node.js request to Spring Boot:

```json
{
  "beforeImageUrl": "https://cdn.example.com/clean2earn/before-1.jpg",
  "afterImageUrl": "https://cdn.example.com/clean2earn/after-1.jpg",
  "aiVerdict": "CLEANED",
  "confidence": 0.96,
  "details": "Gemini validated cleanup, timestamp matched, metadata acceptable"
}
```

## Tech Stack

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA
- Spring Security
- JWT
- Spring Mail
- PostgreSQL

## Architecture

- Controller -> Service -> Repository
- DTO-based request/response layer
- Global exception handling

## Database Configuration

Update [application.properties](/Users/cortane/Desktop/clean2earn-backend/src/main/resources/application.properties) with your PostgreSQL credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/clean2earn
spring.datasource.username=postgres
spring.datasource.password=your_postgres_password
spring.datasource.driver-class-name=org.postgresql.Driver
```

## Run

```bash
./mvnw spring-boot:run
```

Base URL:

```text
http://localhost:8080
```

## Authentication

Protected endpoints require a bearer token:

```http
Authorization: Bearer <jwt-token>
```

## Business Rules

- A user can create at most 2 submissions per day
- A user can earn rewards at most 2 times per day
- Local users must verify email before login
- If `aiVerdict = CLEANED`, the user earns `10` coins
- If `aiVerdict != CLEANED`, the submission is stored as rejected and no reward is granted

## API Response Format

All endpoints return this wrapper:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 200,
  "message": "Request successful",
  "data": {}
}
```

Validation errors return:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 400,
  "message": "Validation failed",
  "data": {
    "fieldName": "error message"
  }
}
```

## API Documentation

### 1. Register User

URL:

```http
POST /api/auth/register
```

Description:

- Creates a new user account
- Generates a 6-digit OTP
- Sends OTP to the user's email
- Default role is `USER`
- Initial `totalCoins` is `0`
- Provider is `LOCAL`
- User is created with `isVerified = false`

Request body:

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "password": "password123"
}
```

Request field description:

- `name`: user full name, required
- `email`: valid email, required, must be unique
- `password`: required, minimum 6 characters

Success response:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 201,
  "message": "User registered successfully",
  "data": {
    "userId": 1,
    "email": "rahul@example.com",
    "isVerified": false,
    "message": "Registration successful. Please verify the OTP sent to your email."
  }
}
```

### 2. Verify OTP

URL:

```http
POST /api/auth/verify-otp
```

Description:

- Verifies the 6-digit OTP for a local user
- Marks the user as verified
- Clears `otp` and `otpExpiry`
- Returns JWT after successful verification

Request body:

```json
{
  "email": "rahul@example.com",
  "otp": "123456"
}
```

Request field description:

- `email`: registered email, required
- `otp`: 6-digit OTP from email, required

Success response:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 200,
  "message": "OTP verified successfully",
  "data": {
    "accessToken": "jwt-token",
    "tokenType": "Bearer",
    "userId": 1,
    "name": "Rahul",
    "email": "rahul@example.com",
    "role": "USER",
    "isVerified": true
  }
}
```

### 3. Login

URL:

```http
POST /api/auth/login
```

Description:

- Authenticates a user
- Returns a JWT token
- Allowed only for verified local users

Request body:

```json
{
  "email": "rahul@example.com",
  "password": "password123"
}
```

Request field description:

- `email`: registered email, required
- `password`: account password, required

Success response:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 200,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt-token",
    "tokenType": "Bearer",
    "userId": 1,
    "name": "Rahul",
    "email": "rahul@example.com",
    "role": "USER",
    "isVerified": true
  }
}
```

Possible error responses:

- `400 Bad Request`: invalid credentials or wrong auth provider
- `401 Unauthorized`: email not verified yet

### 4. Google Login

URL:

```http
POST /api/auth/google
```

Description:

- Used after Node.js verifies the Google OAuth token
- If the user exists as a Google user, returns JWT
- If the user does not exist, creates a new Google user and returns JWT
- Local email/password users are not auto-converted to Google users

Request body:

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "providerId": "google-oauth-sub-id"
}
```

Request field description:

- `name`: Google display name, required
- `email`: verified Google email, required
- `providerId`: stable Google provider id from Node.js, required

Success response:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 200,
  "message": "Google login successful",
  "data": {
    "accessToken": "jwt-token",
    "tokenType": "Bearer",
    "userId": 1,
    "name": "Rahul",
    "email": "rahul@example.com",
    "role": "USER",
    "isVerified": true
  }
}
```

### 5. Create Submission

URL:

```http
POST /submissions
```

Authentication:

- Required

Description:

- Stores a cleaning submission after Node.js has already completed AI validation
- Applies reward rules based on the AI verdict

Request body:

```json
{
  "beforeImageUrl": "https://example.com/before.jpg",
  "afterImageUrl": "https://example.com/after.jpg",
  "aiVerdict": "CLEANED",
  "confidence": 0.95,
  "details": "Trash removed and area looks clean"
}
```

Request field description:

- `beforeImageUrl`: URL of the before image, required
- `afterImageUrl`: URL of the after image, required
- `aiVerdict`: AI result from Node.js, required
- `confidence`: AI confidence score from `0.0` to `1.0`, required
- `details`: AI explanation or metadata, required

Business behavior:

- If `aiVerdict = CLEANED`, submission status becomes `APPROVED`
- If `aiVerdict != CLEANED`, submission status becomes `REJECTED`
- If approved and daily reward limit is not reached, user earns `10` coins
- If the user already created 2 submissions today, request fails
- If the user already earned 2 rewards today, request fails for another `CLEANED` reward attempt

Success response:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 201,
  "message": "Submission stored successfully",
  "data": {
    "id": 10,
    "userId": 1,
    "beforeImageUrl": "https://example.com/before.jpg",
    "afterImageUrl": "https://example.com/after.jpg",
    "status": "APPROVED",
    "aiVerdict": "CLEANED",
    "confidence": 0.95,
    "details": "Trash removed and area looks clean",
    "createdAt": "2026-04-04T14:20:00"
  }
}
```

Possible error responses:

- `400 Bad Request`: invalid body, daily submission limit reached, or daily reward limit reached
- `401 Unauthorized`: missing or invalid JWT token

### 6. Get User Dashboard

URL:

```http
GET /users/dashboard
```

Authentication:

- Required

Description:

- Returns current user summary data
- Includes recent submissions and recent transactions
- Includes today counters

Success response:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 200,
  "message": "Dashboard fetched successfully",
  "data": {
    "userId": 1,
    "name": "Rahul",
    "email": "rahul@example.com",
    "totalCoins": 20,
    "todaysSubmissionCount": 2,
    "todaysRewardCount": 2,
    "recentSubmissions": [
      {
        "id": 10,
        "userId": 1,
        "beforeImageUrl": "https://example.com/before.jpg",
        "afterImageUrl": "https://example.com/after.jpg",
        "status": "APPROVED",
        "aiVerdict": "CLEANED",
        "confidence": 0.95,
        "details": "Trash removed and area looks clean",
        "createdAt": "2026-04-04T14:20:00"
      }
    ],
    "recentTransactions": [
      {
        "id": 5,
        "userId": 1,
        "coins": 10,
        "type": "EARN",
        "reason": "Reward for approved cleaning submission",
        "createdAt": "2026-04-04T14:20:00"
      }
    ]
  }
}
```

Response field description:

- `userId`: current authenticated user id
- `name`: current user name
- `email`: current user email
- `totalCoins`: total accumulated coins
- `todaysSubmissionCount`: number of submissions created today
- `todaysRewardCount`: number of reward transactions earned today
- `recentSubmissions`: latest 5 submissions
- `recentTransactions`: latest 5 transactions

### 7. Get Transactions

URL:

```http
GET /transactions
```

Authentication:

- Required

Description:

- Returns all reward transactions for the authenticated user
- Ordered by newest first

Success response:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 200,
  "message": "Transactions fetched successfully",
  "data": [
    {
      "id": 5,
      "userId": 1,
      "coins": 10,
      "type": "EARN",
      "reason": "Reward for approved cleaning submission",
      "createdAt": "2026-04-04T14:20:00"
    },
    {
      "id": 4,
      "userId": 1,
      "coins": 10,
      "type": "EARN",
      "reason": "Reward for approved cleaning submission",
      "createdAt": "2026-04-03T11:30:00"
    }
  ]
}
```

Response field description:

- `id`: transaction id
- `userId`: owner user id
- `coins`: amount added or deducted
- `type`: `EARN` or `DEDUCT`
- `reason`: business reason for the transaction
- `createdAt`: transaction creation time

### 8. Get Leaderboard

URL:

```http
GET /leaderboard
```

Authentication:

- Required

Description:

- Returns top 10 users ordered by highest `totalCoins`

Success response:

```json
{
  "timestamp": "2026-04-04T14:20:00Z",
  "status": 200,
  "message": "Leaderboard fetched successfully",
  "data": [
    {
      "userId": 1,
      "name": "Rahul",
      "totalCoins": 50
    },
    {
      "userId": 2,
      "name": "Aman",
      "totalCoins": 30
    }
  ]
}
```

Response field description:

- `userId`: user id
- `name`: user name
- `totalCoins`: total coins used for ranking

## Status Codes

- `200 OK`: request successful
- `201 Created`: resource created successfully
- `400 Bad Request`: invalid input or business rule violation
- `401 Unauthorized`: token missing or invalid
- `404 Not Found`: requested resource not found
- `500 Internal Server Error`: unexpected server error

## Main Entities

### User

- `id`
- `name`
- `email`
- `password`
- `provider`
- `providerId`
- `isVerified`
- `otp`
- `otpExpiry`
- `role`
- `totalCoins`
- `createdAt`

### CleaningSubmission

- `id`
- `userId`
- `beforeImageUrl`
- `afterImageUrl`
- `status`
- `aiVerdict`
- `confidence`
- `details`
- `createdAt`

### RewardTransaction

- `id`
- `userId`
- `coins`
- `type`
- `reason`
- `createdAt`

## Notes

- This backend does not run AI checks
- This backend does not upload images
- The `beforeImageUrl` and `afterImageUrl` values must be provided by the client or Node.js layer
- For production, move DB credentials, JWT secret, and mail credentials to environment variables
- The project currently supports both `/auth/*` and `/api/auth/*` routes for auth compatibility
- Node.js should verify Google identity before calling `/api/auth/google`
