# Lead Management System - Backend

Node.js backend for the lead management system.

## Quick Start 🚀

1. Make sure MongoDB is running on your system

2. Create `.env` file in the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lead-management or mongodb Atlash Url
```

3. Install dependencies:

```bash
npm i
```

4. Start the development server:

```bash
npm run dev
```

The server will start on [http://localhost:5000](http://localhost:5000)

## Important Notes ⚠️

- MongoDB must be running before starting the server
- Server must run on port 5000 for the frontend to work

## API Routes 🛣️

- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

## Features

- RESTful API endpoints for lead management
- MongoDB database integration
- Email validation and uniqueness check
- Error handling and validation
- TypeScript support
- Mongoose ODM

## Prerequisites

- Node.js 16.x or later
- MongoDB 4.x or later
- npm or yarn package manager

## Configuration

1. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/lead-management
   ```
   Adjust these values according to your setup.

## Database Setup

1. Make sure MongoDB is running on your system
2. The application will automatically:
   - Connect to MongoDB
   - Create necessary collections
   - Set up indexes for email uniqueness

## Running the Application

1. For development (with hot reload):

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. For production:
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

## API Endpoints

### Leads

- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

### Request/Response Examples

#### Create Lead

```bash
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "status": "New"
}
```

#### Update Lead Status

```bash
PUT /api/leads/:id
Content-Type: application/json

{
  "status": "Engaged"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Request handlers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── validations/  # Request validation
│   └── index.ts      # Application entry point
├── scripts/          # Utility scripts
└── package.json      # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

## Notes

- The server runs on port 5000 by default
- Make sure MongoDB is running before starting the server
- For development, the server will automatically restart on file changes
- All API endpoints are prefixed with `/api`
