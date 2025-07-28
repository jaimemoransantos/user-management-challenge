
# 🧑‍💻 User Management Challenge

A full-stack user management system with live updates using Firebase Realtime Database, Vite + React.js, and Node.js — all running in Docker.

---

## 🚀 How to Run the Project

This project is fully containerized using **Docker**, including the Firebase Emulator Suite.

### ✅ Prerequisites

- Docker installed
- Port `5002` (hosting), `5001` (functions), `9000` (database), and `4000` (emulator UI) must be available

---

### 📦 Steps

```bash
# Clone the repository
git clone https://github.com/jaimemoransantos/user-management-challenge.git
cd user-management-challenge
```

### 📄 .env Setup (Required)

Inside the `backend/functions` folder, create a file named `.env` and add your OpenWeatherMap API key:

```env
# backend/functions/.env
OPEN_WEATHER_MAP_API_KEY=your-api-key
```

🔐 You may replace the sample key with your own from [openweathermap.org](https://openweathermap.org/api)  
✅ This file is required to fetch location and timezone data by ZIP code using the OpenWeatherMap API.

You can either:

- Create the `.env` file manually using the structure above, **or**
- Copy the provided `.env.example` file and edit it:

#### 🖥 On macOS / Git Bash / WSL:
```bash
cp backend/functions/.env.example backend/functions/.env
```

#### 🪟 On Windows PowerShell:
```powershell
Copy-Item backend/functions/.env.example backend/functions/.env
```

```bash
# Build and start the project
docker compose up --build
```

### 🔗 Access the App

- Frontend UI: [http://localhost:5002](http://localhost:5002)
- Emulator UI: [http://localhost:4000](http://localhost:4000)

> ⚠️ No Firebase login or credentials are needed — the project uses the emulator in local-only mode.

---

## 💡 My Approach

The solution is built as a full-stack web app using:

- **React + Vite** for the frontend (with Tailwind for styling and Leaflet for map rendering)
- **Node.js + Express** backend running in Firebase Cloud Functions (locally via Emulator)
- **Firebase Realtime Database** for persistent storage and real-time updates across the frontend
- **OpenWeatherMap API** to fetch location and timezone based on zip code

Instead of fetching data via API GET requests, I implemented a client-side Firebase SDK hook that listens to the Realtime Database directly, showcasing real-time data updates in the frontend.

---

## ✅ What I Implemented

### Backend (Cloud Functions)

- Full **CRUD API** for users
  - `POST /users`: Create new user with zip code → resolves coordinates and timezone
  - `PUT /users/:id`: Update user and re-fetch geo info if zip code changes
  - `DELETE /users/:id`: Remove user
  - `GET /users` and `GET /users/:id`: Present for completeness (not used in frontend)

### Frontend

- **Interactive Map** that displays user locations and highlights their corresponding timezones visually
- **Sidebar List** with real-time updates (from Realtime DB)
- **Edit Modal** to update a user's name or ZIP code — changes are instantly saved and the timezone is recalculated automatically
- **Add User Modal**: to create a new user by entering a name and ZIP code, with geolocation and timezone fetched via OpenWeatherMap API

### Firebase

- Uses Realtime Database Emulator locally (`database.rules.json` includes read-only rules for safety)
- No authentication required

---

## 🤔 Assumptions I Made

- The project will run locally using Firebase Emulators and not a real Firebase project.
- Zip Code Validation ensures only valid ZIP codes are accepted, with error handling for failed OpenWeatherMap API responses
- Each user’s location (lat/lon) and timezone depend only on the zip code provided.

---

## 🧪 Testing Done

- Manual testing through:
  - Creating, updating, and deleting users
  - Verifying frontend updates immediately after database writes
  - Observing proper map and list synchronization
  - Testing failure cases like invalid zip codes (e.g. via logs and UI messages)
  - Ran everything inside Docker to ensure portability and isolation

---

## 🧱 Folder Structure (Simplified)

```
├── backend
│   ├── functions # Firebase Cloud Functions (Express API)
│   │   └── .env # Add your OpenWeatherMap API key here
├── frontend
│   └── src # React App
├── database.rules.json
├── firebase.json
├── Dockerfile
├── docker-compose.yml
```

---

## 🧠 Bonus

- Built a **custom hook** (`useRealtimeDB`) to listen to Firebase Realtime Database updates using `onValue`, enabling live updates without polling.
- Used **Leaflet** to visualize user location markers on a map — great for a real-world touch.
- Styled with **Tailwind CSS** for clean and responsive layout (desktop-first, but ready to adapt to mobile with tweaks).