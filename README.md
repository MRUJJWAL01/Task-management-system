📝 Task Manager App

👤 Author & Contact
Ujjwal Singh Chouhan
📧 Email: chouhanujjwalsingh20@gmail.com
📱 Phone: +91 9826594326
💼 LinkedIn: linkedin.com/in/ujjwalsingh-chouhan


A simple Task Management System built with Node.js, Express, MongoDB, and JWT Authentication.
This app allows users to sign up, log in, and manage their tasks (add, edit, delete, toggle status).

🚀 Features

🔐 User Authentication (Signup/Login with JWT)

➕ Add Task (title, description, status)

✏️ Edit Task

❌ Delete Task

🔄 Toggle Task Status (Pending ↔ Completed)

📋 View All Tasks with optional status filter

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT (JSON Web Token)

Tools: Postman (API Testing)

📂 Project Setup

1. Clone the repository
   git clone <your_repo_url>
   cd task-manager

2. Install dependencies
   npm install

3. Configure environment variables

Create a .env file in the root:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=your_jwt_secret_key

4. Run the server
   npm start

Server will start at:

http://localhost:5000

🔑 API Endpoints
🔐 Auth Routes

Signup:
POST /api/auth/signup

{
"username": "ujjwal",
"email": "ujjwal@example.com",
"password": "123456"
}

Login:
POST /api/auth/login

{
"email": "ujjwal@example.com",
"password": "123456"
}

📋 Task Routes (Protected → requires JWT in Header)

Add Task:
POST /api/tasks

{
"title": "Complete Assignment",
"description": "Finish Node.js task manager project"
}

List Tasks (all or filter):
GET /api/tasks?status=pending

Edit Task:
PUT /api/tasks/:id

Toggle Task Status:
PATCH /api/tasks/:id/toggle

Delete Task:
DELETE /api/tasks/:id

🔒 Authentication

Add this header in all task routes:

Authorization: Bearer <your_jwt_token>

✅ Example Task Flow

Sign up a new user

Login to get a JWT token

Use token in header and create tasks

View tasks with GET route

Update / Toggle / Delete tasks

📌 Future Improvements

Add a frontend (React.js)

Add due dates and priority levels

Add password reset functionality
