# HRMS Lite (Employee Management System)

## Project Overview

HRMS Lite is a lightweight Human Resource Management System built to manage core employee-related operations.  
The application allows organizations to manage employees and track attendance using a modern full-stack architecture.

This project is designed as a **learning-focused, production-style application** showcasing:
- RESTful API design
- Frontend–backend separation
- Real-world CRUD operations
- MongoDB integration

---

## Tech Stack Used

### Backend
- **Python**
- **FastAPI** – REST API framework
- **MongoDB** – NoSQL database
- **PyMongo** – MongoDB driver
- **Uvicorn** – ASGI server
- **Pydantic** – Data validation

### Frontend
- **React.js**
- **Axios** – API communication
- **React Router** – Client-side routing
- **CSS / Basic styling**

---

## Steps to Run the Project Locally

### 1 Clone the Repository
```bash
git clone <your-repo-url>
cd hrms-lite

### 2 Backend Setup (FastAPI)
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload

### 3 Frontend Setup (React)
cd frontend
npm install
npm start
