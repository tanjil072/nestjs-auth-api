# NestJS Auth Demo

Production-ready NestJS authentication with JWT access/refresh tokens, rotation, revocation, guards, roles (as in the blog post).

## Features
- Register/Login with DTO validation + bcrypt
- Short access token (15m), refresh (7d) - rotated/hashed/stored
- Logout revokes session
- Guards: JWT + Roles (admin/user)
- Global validation pipe

## Setup
```bash
cd nestjs-auth
npm install
npm run start:dev
```

JWT_SECRET=your-secret (optional, dev: super-secret-key-for-dev)

## API Endpoints

**Public:**
- POST /auth/register `{"email":"test@example.com","password":"123456","name":"Test"}`
- POST /auth/login `{"email":"admin@example.com","password":"adminpass"}`

**Protected:**
- POST /auth/refresh `{"refresh_token":"..."}`
- DELETE /auth/logout `{"refresh_token":"..."}`
- GET /auth/profile (Authorization: Bearer <access>)
- GET /auth/admin (admin role only)

**Test Admin:** admin@example.com / adminpass

## Curl Examples

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"adminpass"}'

# Profile
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <access_token>"

# Refresh
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token":"<refresh_token>"}'
```

In-memory users/refresh tokens. Ready for GitHub / Medium post!

