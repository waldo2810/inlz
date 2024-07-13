# Setup

## environment variables:
### Web (Next)
```
NEXT_PUBLIC_TOKEN_NAME=<name of the cookie where token will be set. example: access_token>
NEXT_PUBLIC_BACKEND_URL=<core service url. example: http://localhost:8080>
```

### Core (Nest)
Database: [Turso](https://docs.turso.tech/introduction) SQLITE.
```
TURSO_CONNECTION_URL=<turso database connection url>
TURSO_AUTH_TOKEN=<turso auth token>

JWT_SECRET=<jwt secret. example: secret>
ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC=<seconds where tokens will be valid. example 3600>
```
