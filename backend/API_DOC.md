# Railway Signals API Documentation

Base URL: `http://localhost:8080`

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": {},
  "count": 0,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Endpoints

### Health Check

```
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "environment": "development"
}
```

---

### Get All Tracks

```
GET /api/tracks
```

**Query Parameters:**

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| track_id  | int    | No       | Filter by track ID           |
| source    | string | No       | Filter by source station     |
| target    | string | No       | Filter by target station     |
| page      | int    | No       | Page number (default: 1)     |
| limit     | int    | No       | Items per page (default: 10) |

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "track_id": 1,
      "source": "London Paddington",
      "target": "Reading",
      "signal_ids": [
        {
          "signal_id": 101,
          "signal_name": "PD123",
          "elr": "GWR1",
          "mileage": 1.5
        }
      ]
    }
  ],
  "count": 1,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "total_pages": 1
  }
}
```

---

### Get Track by ID

```
GET /api/tracks/:id
```

**Path Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| id        | int  | Yes      | Track ID    |

**Response:**

```json
{
  "success": true,
  "data": {
    "track_id": 1,
    "source": "London Paddington",
    "target": "Reading",
    "signal_ids": [
      {
        "signal_id": 101,
        "signal_name": "PD123",
        "elr": "GWR1",
        "mileage": 1.5
      }
    ]
  },
  "count": 1
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "track not found"
}
```

---

### Get All Signals

```
GET /api/signals
```

**Query Parameters:**

| Parameter   | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| signal_id   | int    | No       | Filter by signal ID             |
| signal_name | string | No       | Filter by signal name (partial) |
| elr         | string | No       | Filter by ELR code (partial)    |
| page        | int    | No       | Page number (default: 1)        |
| limit       | int    | No       | Items per page (default: 10)    |

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "signal_id": 101,
      "signal_name": "PD123",
      "elr": "GWR1",
      "mileage": 1.5
    }
  ],
  "count": 1,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "total_pages": 1
  }
}
```

---

### Get Signal by ID

```
GET /api/signals/:id
```

**Path Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| id        | int  | Yes      | Signal ID   |

**Response:**

```json
{
  "success": true,
  "data": {
    "signal_id": 101,
    "signal_name": "PD123",
    "elr": "GWR1",
    "mileage": 1.5
  },
  "count": 1
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "signal not found"
}
```

---

### Get Tracks for Signal

```
GET /api/signals/:id/tracks
```

**Path Parameters:**

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| id        | int  | Yes      | Signal ID   |

**Response:**

```json
{
  "success": true,
  "data": {
    "signal": {
      "signal_id": 101,
      "signal_name": "PD123",
      "elr": "GWR1",
      "mileage": 1.5
    },
    "tracks": [
      {
        "track_id": 1,
        "source": "London Paddington",
        "target": "Reading",
        "signal_ids": []
      }
    ]
  },
  "count": 1
}
```

**Error Response (404):**

```json
{
  "success": false,
  "error": "signal not found"
}
```

---

## Error Codes

| Status Code | Description                  |
| ----------- | ---------------------------- |
| 200         | Success                      |
| 400         | Bad Request (invalid params) |
| 404         | Resource Not Found           |
| 500         | Internal Server Error        |

## Notes

- All query parameters support partial matching for string fields
- Pagination defaults: page=1, limit=10
- Nullable fields (signal_name, elr, mileage) may be null in responses
- All IDs must be positive integers
