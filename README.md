# IoT Dashboard Application

A full-stack IoT Dashboard designed to monitor environmental data (temperature & humidity), control devices via relay, and provide role-based access for different users. The system simulates IoT device behavior and visualizes real-time and historical data efficiently.

---

## Overview

This project demonstrates a complete IoT pipeline:

- **Data Generation (Simulator / Device Layer)**
- **Backend Processing (Node.js + Express)**
- **Database Storage (MongoDB)**
- **Frontend Visualization (React Dashboard)**

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

> Run this command in both **frontend** and **backend** directories.

---

## Running the Application

### 🔹 Start Backend Server

```bash
npm start
```

### 🔹 Start Frontend

```bash
npm start
```

> Ensure both servers are running simultaneously.

---

## Demo Login Credentials

| Role     | Email                                           | Password |
| -------- | ----------------------------------------------- | -------- |
| Admin    | [admin@gmail.com](mailto:admin@gmail.com)       | 123456   |
| Operator | [operator@gmail.com](mailto:operator@gmail.com) | 123456   |
| Viewer   | [viewer@gmail.com](mailto:viewer@gmail.com)     | 123456   |

---

## Core Features

### Real-Time Monitoring

- Displays **temperature and humidity**
- Updates dynamically when relay is ON

### Relay Control

- Toggle device ON/OFF
- Controls whether data is generated and stored

### Historical Data

- Stores last 50 readings
- Visualized using charts

### Role-Based Access

- **Admin / Operator:** Can control relay
- **Viewer:** Read-only access

---

## Data Flow Architecture

```text
Simulator → Backend → MongoDB → API → Frontend
```

### When Relay is ON:

1. Simulator generates data every 3 seconds
2. Backend stores data in MongoDB
3. Frontend fetches updated data via polling
4. UI updates charts and metrics

### When Relay is OFF:

- Simulator stops
- No new data generated
- Frontend shows last stored values (static)

---

## Polling vs WebSockets (Important Concept)

### Polling (Used in this project)

- Frontend calls API every 3 seconds:

```js
setInterval(fetchData, 3000);
```

#### Advantages:

- Simple to implement
- Reliable
- No persistent connection required

#### Disadvantages:

- Extra API calls (even when no changes)
- Slight delay (up to polling interval)

---

### WebSockets (Alternative Approach)

- Backend pushes data instantly using sockets

#### Advantages:

- Real-time updates (zero delay)
- Efficient (no repeated API calls)

#### Disadvantages:

- More complex setup
- Requires connection management

---

### Why Polling was Used Here

- Simpler architecture for demonstration
- Easier debugging and scalability for beginners
- Suitable for low-frequency updates (3s interval)

---

## 🛠 Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB (Mongoose)

### Communication

- REST APIs (Polling-based updates)

---

## Authentication Flow

1. User logs in → receives JWT token
2. Token stored in `localStorage`
3. Token sent with every API request
4. Auto-login if token exists

---

## Project Structure

```text
backend/
  ├── models/
  ├── routes/
  ├── controllers/
  ├── simulator.js
  └── server.js

frontend/
  ├── components/
  ├── pages/
  ├── context/
  └── services/
```

---

## Environment Variables

Create `.env` files:

### Backend

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend

```env
REACT_APP_API_URL=https://anedya.onrender.com/api || http://localhost:10000/api
```

---

## Future Improvements

- Replace polling with WebSockets
- Multi-device support
- Alerts & notifications
- Mobile responsiveness improvements
- Advanced analytics dashboard

---

## Testing Scenarios

- Toggle relay ON → verify live updates
- Toggle relay OFF → verify static data
- Login with different roles → verify permissions
- Refresh page → verify auto-login

---

## Author

Developed by **Divya Kumar**

---

## Notes

- Ensure MongoDB Atlas IP whitelist is configured
- Restart server after updating `.env`
- Backend must be running before frontend
