#  School Management API

A simple Node.js + Express REST API for managing schools in a MySQL database.  
Supports adding new schools and retrieving a list of schools sorted by proximity to a given location.

> **Note:** This project currently uses a **local MySQL database**. The live deployment is only for demonstrating API structure — it will not persist data unless connected to a cloud database.

---

# Live Deployment

Base URL: **[https://school-management-1-dncm.onrender.com](https://school-management-1-dncm.onrender.com)**

Example:
- `POST https://school-management-1-dncm.onrender.com/addSchool`
- `GET https://school-management-1-dncm.onrender.com/listSchools?latitude=28.6&longitude=77.2`

---

# Project Overview

- Implements **Add School** and **List Schools** APIs  
- Uses **MySQL** (local) via `mysql2` package  
- Calculates distance using the **Haversine formula**  
- Can be deployed to any Node.js-compatible cloud platform

---

# Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MySQL (local)  
- **Utilities:** dotenv, express-validator, mysql2, nodemon (dev only)

---

# Local Setup

### 1. Clone Repository
```bash
git clone https://github.com/Paras-mourya/School-Management.git
cd School-Management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env` in the root:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
PORT=3000
DB_SSL=false
```

### 4. Database Setup
Run in MySQL:
```sql
CREATE DATABASE school_management;

USE school_management;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

### 5. Start Server
```bash
npm run dev   # for development
npm start     # for production
```
Server runs at: `http://localhost:3000`

---

## API Endpoints

### 1. Add School
**POST** `/addSchool`  
Request Body:
```json
{
  "name": "Delhi Public School",
  "address": "Delhi, India",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```
Response:
```json
{
  "message": "School added successfully"
}
```

---

### 2. List Schools
**GET** `/listSchools?latitude=<lat>&longitude=<lon>`  
Example:
```
GET /listSchools?latitude=28.6&longitude=77.2
```
Response Example:
```json
[
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Delhi, India",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": 12.34
  }
]
```

---

##  Postman Collection

- **Share Link:** [View Collection](https://parasmourya.postman.co/workspace/Paras-Mourya's-Workspace~05be961d-f821-493b-8615-6d8f6a448ba2/collection/44755927-5231a8bc-2ba5-47aa-9c09-53c44af6a1ad?action=share&source=collection_link&creator=44755927)
- **Local File:** [`postman_collection.json`](./73f25ce7-e20c-4c08-bf15-181da0649325.json)

---

##  Author

**Paras Mourya**  
Backend Developer | Java & Node.js Enthusiast  
[GitHub](https://github.com/Paras-mourya)

---
