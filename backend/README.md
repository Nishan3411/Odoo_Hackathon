Traveloop Backend

Backend API for Traveloop - AI-Powered Multi-City Travel Planner

Features

- User authentication with JWT
- Trip management with stops and activities
- Budget tracking
- Checklist and notes
- AI-powered recommendations and summaries
- Public trip sharing
- Admin analytics

Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

Getting Started

Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

Installation

1. Clone the repository and navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/traveloop
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

5. Start MongoDB service (if running locally)

6. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

API Endpoints

Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

Trips
- `GET /api/trips` - Get all user trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:id` - Get single trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

Stops
- `GET /api/trips/:tripId/stops` - Get trip stops
- `POST /api/trips/:tripId/stops` - Create stop
- `PUT /api/stops/:id` - Update stop
- `DELETE /api/stops/:id` - Delete stop

Activities
- `GET /api/stops/:stopId/activities` - Get stop activities
- `POST /api/stops/:stopId/activities` - Create activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

Budget
- `GET /api/trips/:tripId/budget` - Get trip budget summary

Checklist
- `GET /api/trips/:tripId/checklist` - Get trip checklist
- `POST /api/trips/:tripId/checklist` - Create checklist item
- `PUT /api/checklist/:id` - Update checklist item
- `DELETE /api/checklist/:id` - Delete checklist item

Notes
- `GET /api/trips/:tripId/notes` - Get trip notes
- `POST /api/trips/:tripId/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

AI Features
- `POST /api/ai/summary` - Generate trip summary
- `POST /api/ai/recommend` - Get activity recommendations
- `POST /api/ai/budget-tips` - Get budget tips

Public Sharing
- `GET /api/public/trips/:shareId` - Get public trip details

Admin
- `GET /api/admin/analytics` - Get system analytics

Health Check
- `GET /api/health` - Server health status

Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Response Format

All responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Development

Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

License

ISC