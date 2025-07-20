# Events Module

This module provides RESTful APIs for event management with AI-like categorization functionality.

## Features

- **AI-like Categorization**: Automatically categorizes events as "Work", "Personal", or "Other" based on keywords in title and notes
- **In-memory Storage**: Events are stored in memory for simplicity
- **Input Validation**: Comprehensive validation using Zod schemas
- **Search & Pagination**: Support for searching events and pagination
- **Sorting**: Events are automatically sorted by date and time

## File Structure

```
Events/
├── events.interface.ts    # TypeScript interfaces
├── events.constant.ts     # Searchable fields and constants
├── events.model.ts        # In-memory data model
├── events.service.ts      # Business logic and AI categorization
├── events.controller.ts   # HTTP request handlers
├── events.validation.ts   # Input validation schemas
├── events.route.ts        # Express routes
└── index.ts              # Module exports
```

## API Endpoints

### POST /api/v1/events

Create a new event with automatic categorization.

**Request Body:**

```json
{
  "title": "Team Meeting",
  "date": "2024-01-15",
  "time": "14:30",
  "notes": "Discuss project progress"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Event is created successfully",
  "data": {
    "id": "1",
    "title": "Team Meeting",
    "date": "2024-01-15",
    "time": "14:30",
    "notes": "Discuss project progress",
    "archived": false,
    "category": "Work",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### GET /api/v1/events

Retrieve all events with search and pagination support.

**Query Parameters:**

- `searchTerm`: Search in title, notes, and category
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### GET /api/v1/events/:id

Retrieve a single event by ID.

### PATCH /api/v1/events/:id

Update an event (with automatic recategorization if title/notes change).

### PUT /api/v1/events/:id

Archive an event (set archived status to true).

### DELETE /api/v1/events/:id

Delete an event permanently.

## AI Categorization Logic

The module automatically categorizes events based on keywords:

**Work Keywords:** meeting, project, client, work, office, business, deadline, presentation, conference

**Personal Keywords:** birthday, family, friend, party, dinner, movie, vacation, holiday, celebration

**Default Category:** Other

## Validation Rules

- **Title**: Required, 1-100 characters
- **Date**: Required, YYYY-MM-DD format
- **Time**: Required, HH:MM format (24-hour)
- **Notes**: Optional, max 500 characters

## Error Handling

The module returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error
