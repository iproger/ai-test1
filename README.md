# Todo List Example

This repository contains a simple full-stack Todo list application with a Spring Boot backend and a React frontend.

## Backend

The backend is located in the `backend` directory and uses Gradle and Spring Boot.

To build and run the backend:

```bash
cd backend
gradle bootRun
```

The service exposes REST endpoints under `/todos`. It uses Spring Data JPA with
an in-memory H2 database by default. To use Amazon RDS (for example a
PostgreSQL instance) set the following environment variables before running the
application:

```
export DB_URL=jdbc:postgresql://<rds-endpoint>:5432/<db>
export DB_USER=<username>
export DB_PASS=<password>
```

Uploaded files are stored in Amazon S3 through the `S3Service`
implementation of `FileStorageService`. Configure the bucket and AWS
credentials with:

```
export AWS_BUCKET=<bucket-name>
export AWS_ACCESS_KEY=<key>
export AWS_SECRET_KEY=<secret>
export AWS_REGION=<region>
```

Use `POST /todos/{id}/attachment` with a `file` multipart field to attach an
image.

## Frontend

The frontend lives in the `frontend` directory. It is a minimal React app that uses CDN scripts, so no build step is required. After starting the backend, open `frontend/index.html` in your browser.

## Testing

A basic JUnit test for the service is included and can be run with:

```bash
cd backend
gradle test
```
