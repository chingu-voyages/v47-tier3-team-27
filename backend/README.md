# Task Management Application Backend

Welcome to the Task Management Application Backend repository! This backend component serves as the foundation for a task management application, providing essential features and integrations for efficient task organization.

## User Flow

1. **User Registration/Login:**

   - Users can create an account or log in using their credentials.
   - Authentication is implemented for secure access to task management features.

2. **Create Task:**

   - Authenticated users can create tasks by providing a title, description, category, sub-category, recurrence of the task, invite others to work on the task.
   - Tasks are securely stored in the database.

3. **View Tasks in My Tasks Page:**

   - Users can view their list of tasks, displaying information such as title, category, sub-category, recurrence of the task.

4. **View Task log in My Tasks Page:**

   - Users can view the history of a task as title, description, category, sub-category, recurrence of the task, invited people on the task, history of the tasks

5. **Update Task in My Tasks Page:**

   - Users can edit task details, including title, description, category, sub-category, recurrence of the task, invited people on the task.
   - Mark tasks as complete or reopen completed tasks.

6. **Delete Task:**

   - Users can delete tasks they no longer need.

7. **view Dashboard logs:**

   - Users can see lasts updates that have happened on the tasks they can work on (statut task, date of the change of the statt, worker who completed the task, extra information added by the worker).

8. **view Dashboard tasks:**
   - Users can see the tasks that have to be completed today.

### Run development server Back End

```
npm run dev
```

### End Points Back End

**User Authentification**

1. **Sign in: Create an account**
   http://localhost:5000/api/auth/signup
   POST request
   Takes username, email, password

2. **Sign up: Log in to an account**
   http://localhost:5000/api/auth/signin
   POST request
   Takes username, email, password

3. **Sign out: Log out of an account**
   http://localhost:5000/api/signout
   POST request
   Takes token, content-type

**Task**

4. **Create Task: Add a New Task**
   http://localhost:5000/api/tasks
   POST request
   Takes task details including title, description, category, sub-category, recurrence, and invited users.

5. **View My Tasks: Retrieve User's Tasks**
   http://localhost:5000/api/tasks/:userId
   GET request
   Takes user ID
   Returns list of tasks associated with the user.

6. **Update Task: Edit Task Details**
   http://localhost:5000/api/tasks/:taskId
   PATCH request
   Takes task ID, updated task details
   Returns updated details of the task.

7. **Delete Task: Remove a Task**
   http://localhost:5000/api/tasks/:taskId
   DELETE request
   Takes task ID
   Returns success message upon successful deletion.

**Task Log**

8. **Add Task Log**
   http://localhost:5000/api/logs/add
   POST request
   Takes:
   Body: userId, logDescription
   Params: taskid

9. **Edit Task Log**
   http://localhost:5000/api/logs/:logid/edit
   PATCH request
   Takes:
   Body: logDescription
   Params: logid

10. **Delete Task Log**
    http://localhost:5000/api/logs/:logid/delete
    DELETE request
    Takes log id

11. **Display List of logs by task**
    http://localhost:5000/api/logs/:taskid/all
    GET request
    Takes task id
