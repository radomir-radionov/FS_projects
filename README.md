# Home Assignment: Portfolio Showcase with FastAPI and React

```vercel```: https://fs-projects-alpha.vercel.app/login

## Backend

### Overview

This project is a backend API for managing projects, built with FastAPI. It supports project management with features like creating, updating, retrieving, and deleting projects. User authentication is handled via JWT-based authentication, ensuring secure access to protected endpoints.

```Swagger UI```: https://fs-projects.onrender.com/docs  
```ReDoc```: https://fs-projects.onrender.com/redoc

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


<img width="1269" alt="image" src="https://github.com/user-attachments/assets/8a504358-44a8-4130-b373-f3ca0904fe59">  
<img width="1034" alt="image" src="https://github.com/user-attachments/assets/434d6632-200d-4d4f-9c9b-23a1b09b39f8">



## Frontend

### Overview

The frontend for this portfolio showcase application is built with React and TypeScript, providing a clean and responsive interface for displaying and managing project information. It includes user authentication, enabling users to log in and view project details, while administrators can perform CRUD operations.

```Stack```: TypeScript, React, Tailwind, Axios

### Application Structure

##### Pages

`Home`: Displays a list of all projects, paginated for easy browsing.  
`Project Detail`: Shows detailed information about a single project, including the project title, description, and any relevant links or images.  
`Login`: Allows users to authenticate and gain access to protected routes.  
`Signup`: Enables new users to register for an account.  
`Admin Dashboard`: A protected page that allows CRUD operations for projects, accessible only to authenticated administrators.

<img width="1268" alt="image" src="https://github.com/user-attachments/assets/983ab428-5ab7-4477-84f7-d43b84e04181">  
<img width="1276" alt="image" src="https://github.com/user-attachments/assets/e21a08d1-8793-42ee-a8a1-f2515c8f387e">  
<img width="1275" alt="image" src="https://github.com/user-attachments/assets/3115a694-5799-41fa-9b7f-ce591a275b6f">  
<img width="864" alt="image" src="https://github.com/user-attachments/assets/07503bf5-2706-4031-8709-9c5b4043699a">  
<img width="790" alt="image" src="https://github.com/user-attachments/assets/f48b33b9-02d4-4cfc-9296-e603a79d663d">  
<img width="1277" alt="image" src="https://github.com/user-attachments/assets/b9c2a7b0-f145-489f-b43f-db5be03c545f">  
<img width="1271" alt="image" src="https://github.com/user-attachments/assets/90f16cc7-637a-4dfd-8514-cfdb80bf3a3e">







