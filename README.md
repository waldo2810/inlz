# Setup

## environment variables:
### Web (Next)
```
NEXT_PUBLIC_TOKEN_NAME=<name of the cookie where token will be set>
```

### Core (Nest)
Database: Turso SQLITE
```
TURSO_CONNECTION_URL=<turso database connection url>
TURSO_AUTH_TOKEN=<turso auth token>

JWT_SECRET=<jwt secret. any string>
ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC=<seconds where tokens will be valid>
```
