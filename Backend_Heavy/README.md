# Task Management Application Backend

Welcome to the Task Management Application Backend repository! This backend component serves as the foundation for a task management application, providing essential features and integrations for efficient task organization.

## User Flow

1. **User Registration/Login:**
   - Users can create an account or log in using their credentials.
   - Authentication is implemented for secure access to task management features.

2. **Create Task:**
   - Authenticated users can create tasks by providing a title, description, and due date.
   - Tasks are securely stored in the database.

3. **View Tasks:**
   - Users can view their list of tasks, displaying information such as title, description, due date, and completion status.

4. **Update Task:**
   - Users can edit task details, including title, description, and due date.
   - Mark tasks as complete or reopen completed tasks.

5. **Delete Task:**
   - Users can delete tasks they no longer need.

6. **Search and Filter Tasks:**
   - Users can search for tasks based on keywords and filter tasks by completion status or due date.

## Technologies Used

### Docker

[Docker](https://www.docker.com/) is utilized for containerization, ensuring consistent application performance across various environments.

#### Build Docker Image


```bash

docker build -t task-management-backend .

```

Run Docker Container

```bash
docker run -p 3000:3000 -d task-management-backend

```

- NGINX for Load Balancing

NGINX is employed for load balancing, distributing incoming traffic across multiple backend instances for improved scalability.
NGINX Installation

```bash
    docker run -p 3000:3000 -d task-management-backend
```

## NGINX for Load Balancing

NGINX is employed for load balancing, distributing incoming traffic across multiple backend instances for improved scalability.

```bash
    sudo apt-get update
    sudo apt-get install nginx
```
Configure NGINX:
Update the NGINX configuration file (/etc/nginx/nginx.conf) to include the load balancing configuration.

Restart NGINX:

```bash
    sudo service nginx restart

Redis for In-Memory Cache

Redis is used for in-memory caching to improve the performance of the application. To use Redis as a caching layer, follow these steps:

    Install Redis:
 
 bash
sudo apt-get update
sudo apt-get install redis-server

* Configure Redis:
Update the application configuration to use Redis as the caching layer.

Start Redis Server:

```bash
    redis-server

- This README provides an overview of the Task Management Application Backend, user flow, installation instructions, and details about Docker, NGINX for load balancing, and Redis for in-memory caching. 
** Feel free to explore the codebase and contribute to the development of this application!


