# CarGame_VanillaJS

## Overview
CarGame_VanillaJS is a dynamic and engaging car game application that includes user registration and login, a leaderboard to track top players, and an interactive game area. The application uses a MongoDB Atlas cluster for data storage and an Express.js backend for handling server-side operations.

## Features
1. **Register/Login**:
   - Secure user authentication.
   - User registration with email verification.
   - Password hashing for security.

2. **Leaderboard**:
   - Display of top players and their scores.
   - Real-time updates of player rankings.
   - Persistent score storage.

3. **Game Area**:
   - Interactive gameplay interface.
   - Responsive design for various devices.
   - Implementation of game mechanics, obstacles, and scoring.

4. **Data Storing**:
   - MongoDB Atlas for storing user data and scores.
   - Data retrieval and manipulation using Mongoose.
   - Ensuring data integrity and security.

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your machine.
- A MongoDB Atlas account with a configured cluster.
- An `.env` file set up correctly.

### Steps ->

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/CarGame_VanillaJS.git
   ```
   ```sh
   cd CarGame_VanillaJS/Backend
   ```
2. **Install the packages**:   
   ```sh
   npm install
   ```
3. **Start the server**:
   - Nodemon:
   ```sh 
   npm run dev
   ```
   - Node:
   ```
   npm start
   ```
