# Event Booking System API

A RESTful API for managing event bookings built with NestJS and PostgreSQL.

## Features

- Event Management (CRUD operations)
- Attendee Registration and Management
- Event Booking System with capacity control
- Request Validation
- Error Handling
- Unit and Integration Tests

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL (managed through Docker)

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd event-booking
```

2. Install dependencies:

```bash
npm install
```

3. Start the application using Docker Compose:

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`

## API Documentation

Once the application is running, you can access the Swagger documentation at:
`http://localhost:3000/api`

## Database Schema

The application uses the following main entities:

- Events
- Attendees
- Bookings
- Locations (Country-based)

## Authentication & Authorization

The API implements the following authentication structure:

- JWT-based authentication for event management
- Public endpoints for attendee registration and event viewing
- Role-based access control (RBAC) for different user types

## Testing

Run the tests using:

```bash
npm run test

OR 

docker compose exec app npm run test
```

## Project Structure

```
src/
├── auth/           # Authentication related code
├── events/         # Event management
├── attendees/      # Attendee management
├── bookings/       # Booking system
├── common/         # Shared utilities and decorators
├── config/         # Configuration files
└── database/       # Database entities and migrations
```

## License

MIT
