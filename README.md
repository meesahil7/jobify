# Full Stack Application

This is a full stack application built with a React frontend and a Node.js/Express backend. 

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Environment Variables](#environment-variables)

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (version >= 14.x)
- Yarn (version >= 1.x)

### Installation

1. Clone the repository:

   git clone [https://github.com/meesahil7/jobify.git](https://github.com/meesahil7/jobify)

2. Install dependencies for both the frontend and backend.

### Running the Application

## Frontend

To run the frontend:

1. Navigate to the ./client directory:
   cd client

2. Install the dependencies:
   yarn

3. Start the development server:
   yarn dev

## Backend

To run the backend

1. Navigate to ./server directory:
   cd ./server

2. Install the dependencies:
   yarn

3. Start the development server:
   yarn dev

### Environment Variables

Set up the following environment variables in your backend. Create a .env file in the ./server directory with the following content:

- PORT=your_port_number
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret_key
