# AI Observer Test Platform

A full-stack React + TypeScript + PHP testing platform.

## Prerequisites

- Node.js & npm
- PHP (CLI or via XAMPP/MAMP)
- MySQL

## Setup Instructions (Windows PowerShell)

### 1. Database Setup
Ensure MySQL is running. Open PowerShell and run:
```powershell
# Adjust user/pass if not root/empty
Get-Content backend/database.sql | mysql -u root ai_observer
```
*Alternatively, create a DB named `ai_observer` and import `backend/database.sql` via PHPMyAdmin.*

### 2. Frontend Setup
```powershell
npm install
# Create .env from example (optional if defaults work)
Copy-Item .env.example .env
```

### 3. Running the App

**Terminal 1: Backend**
Run the built-in PHP server from the project root:
```powershell
php -S 127.0.0.1:8000
```
*Note: We run from root so `backend/api.php` is accessible at `http://localhost:8000/backend/api.php`.*
*If you change this, update `VITE_API_URL` in `.env`.*

**Terminal 2: Frontend**
```powershell
npm run dev
```
Open the URL shown (usually http://localhost:5173).

## Default Logins
- **Teacher**: teacher@test.com / password
- **Student**: student@test.com / password
