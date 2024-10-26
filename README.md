# Home Assignment: Portfolio Showcase with FastAPI and React

## Backend

### Overview

This project is a backend API for managing projects, built with FastAPI. It supports project management with features like creating, updating, retrieving, and deleting projects. User authentication is handled via JWT-based authentication, ensuring secure access to protected endpoints.

### Features

#### Endpoints:

```GET /projects```: Retrieve all projects with pagination.
```GET /projects/{id}```: Retrieve a specific project by its ID.
```POST /projects```: Create a new project (JWT protected).
```PUT /projects/{id}```: Update an existing project (JWT protected).
```DELETE /projects/{id}```: Delete a project (JWT protected).
```POST /auth/signup```: Register a new user.
```POST /auth/login```: Authenticate a user and issue JWT.

#### Data Models: 

```Data Persistence```: SQLite database with SQLAlchemy ORM for managing database models and interactions.

```Project```: Contains fields like id, title, description, image_url, project_url, created_at, and updated_at.

```User```: Contains fields like id, username, email, hashed_password, and is_active.

#### Additional

```Authentication```: JWT-based authentication to protect sensitive endpoints.

```Validation```: Pydantic models for request and response validation.

```CORS Handling```: Configured to allow frontend interactions.

```Documentation```: Auto-generated API documentation available at /docs (Swagger UI) and /redoc (ReDoc).


to run project: uvicorn main:app --reload
