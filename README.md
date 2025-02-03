## Table of Contents
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Backend Overview](#backend-overview)
- [Frontend Overview](#frontend-overview)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
---

## Introduction

The TechJob platform is designed to display and manage job postings for the tech industry. The backend, built with Spring Boot, uses MongoDB for data storage. The frontend, developed using React, presents these job posts to users.


---

## Tech Stack

- **Backend**: Spring Boot
- **Frontend**: React
- **Database**: MongoDB (Cloud - MongoDB Atlas)
- **Libraries/Tools**:
  - Spring Data MongoDB
  - React Hooks
  - Axios for API calls


---

## Backend Overview

The backend of this project is built using **Spring Boot**. It handles job post data and exposes REST APIs for the frontend to consume. The data is stored in **MongoDB**, which is hosted on **MongoDB Atlas**.

Key components of the backend:
- **MongoDB**: Cloud-based NoSQL database used to store job posts.
- **Spring Boot**: Handles RESTful endpoints for CRUD operations on job posts.
- **Spring Data MongoDB**: Manages data access for MongoDB.


---

## Frontend Overview

The frontend is built with **React**. It communicates with the backend through **Axios** to retrieve job posts and display them to the user. The React app is designed with components that handle:
- Fetching job posts from the backend.
- Displaying job details, including descriptions, required skills, and experience.
- Allowing users to filter job posts.


---

## Installation

### Backend Setup

1. Clone the backend repository:
   git clone https://github.com/suraj-khot-19/TechJob-SpringBoot.git
  

2. Navigate to the project directory:
   cd TechJob-SpringBoot

3. Build and run the Spring Boot application:
   mvn clean install
   mvn spring-boot:run
   

### Frontend Setup

1. Clone the frontend repository:
   git clone https://github.com/suraj-khot-19/TechJob-React.git
   

2. Navigate to the project directory:
   cd TechJob-React

3. Install the required dependencies:
   npm install

4. Start the React app:
   npm start

---

## Running the Application

1. **Backend**: The backend will be running on http://localhost:8080.
2. **Frontend**: The frontend will be running on http://localhost:3000.

Make sure to update the MongoDB URI in the backend's configuration file with your MongoDB Atlas credentials.
