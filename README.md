# User Authentication System

This project implements a user authentication system with login and registration functionalities using React for the frontend and Node.js with Express for the backend. The application allows users to register, log in, and view their information in a protected area.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend Structure](#frontend-structure)
- [License](#license)

## Features

- User registration with name, date of birth, email, and password.
- User login functionality.
- JSON Web Token (JWT) authentication.
- Protected routes that require authentication to access.
- User information is stored in local storage after login or registration.
- Static table displaying user information.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS (or any preferred styling framework)

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/Arul-1911/login-register-app.git

Backend Setup
Navigate to the backend directory:
cd backend

Install the required packages:
npm install

Create a .env file in the backend directory with the following content:
text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend server:
node server.js

Frontend Setup
Navigate to the frontend directory:

cd frontend

Install the required packages:

npm install

Start the frontend application:

npm start

Usage
Open your browser and navigate to http://localhost:3000 to access the application.
Use the registration form to create a new user account with the following fields:
Name
Date of Birth
Email
Password
After registering, log in using your credentials.
Upon successful login, you will be redirected to a protected page displaying your user information in a static table.
API Endpoints
1. User Registration API
Endpoint: POST /api/auth/register
Request Body:
json
{
    "name": "John Doe",
    "dob": "1990-01-01",
    "email": "john@example.com",
    "password": "securePassword123"
}

Response:
json
{
    "user": {
        "_id": "user_id",
        "name": "John Doe",
        "dob": "1990-01-01T00:00:00.000Z",
        "email": "john@example.com"
    }
}

2. User Login API
Endpoint: POST /api/auth/login
Request Body:
json
{
    "name": "John Doe",
    "password": "securePassword123"
}

Response:
json
{
    "token": "your_jwt_token_here",
    "user": {
        "_id": "user_id",
        "name": "John Doe",
        "dob": "1990-01-01T00:00:00.000Z",
        "email": "john@example.com"
    }
}

Frontend Structure

The frontend consists of several components:

Register Component: A form for user registration.

Login Component: A form for user login.

User Table Component: Displays user information in a static table after successful login.

Example of User Table Display
javascript
const UserTable = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h1>User Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {userData && (
                        <tr>
                            <td>{userData.name}</td>
                            <td>{new Date(userData.dob).toLocaleDateString()}</td>
                            <td>{userData.email}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
