# C#26 :school: <img src="https://cdn.prod.website-files.com/6105315644a26f77912a1ada/63eea844ae4e3022154e2878_Holberton-p-800.png" width="150" /> - Part 2 - HBnB Team Project - 

## 🔍Overview

This project is part of the HBnB web application and focuses on building the **Business Logic** and **Presentation (API)** layers of the app. In Part 2, we define the project structure, implement core entity classes, and set up a RESTful API using Flask and Flask-RESTx.

## ✅ Objectives

- Create a modular project architecture
- Implement core business logic for Users, Places, Reviews, and Amenities
- Set up a Flask-based RESTful API with `flask-restx`
- Build a facade layer to connect the API and business logic

## 🗂️ Project Structure
```
hbnb/
├── app/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │       ├── __init__.py
│   │       ├── users.py
│   │       ├── places.py
│   │       ├── reviews.py
│   │       ├── amenities.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── basemodel.py
│   │   ├── user.py
│   │   ├── place.py
│   │   ├── review.py
│   │   ├── amenity.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── facade.py
│   ├── persistence/
│       ├── __init__.py
│       ├── repository.py
├── run.py
├── config.py
├── requirements.txt
├── README.md
```

---

## 🎯 Objectives

By the end of this part, the project supports:

- Modular Flask project structure
- Object modeling for `User`, `Place`, `Review`, `Amenity`
- RESTful endpoints for CRUD operations
- Use of the **Facade pattern** to interface between API and business logic
- In-memory data storage with extendable repositories
- Data enrichment and serialization
- Unit and integration testing

---

## 🧱 Architecture Overview

### 🧩 Layered Structure

- **API Layer (Presentation)**: REST API using Flask + Flask-RESTx
- **Business Logic Layer**: Entity behavior, validations, relations
- **Persistence Layer**: In-memory repository abstraction
- **Facade Layer**: Central access point for business logic

---

## 🏗️ Implemented Features

### 0. 🗂️ Project Setup

- Modular folders:
  - `api/` for route definitions
  - `models/` for business entities
  - `facade/` as an entry point to the business logic
  - `repository/` for in-memory persistence
- Flask-RESTx initialized with Swagger UI
- Swagger auto-generates documentation from defined models

---

### 1. 🧠 Business Models

- `BaseModel`: common fields (`id`, `created_at`, `updated_at`)
- `User`: name, email, password (not exposed via API)
- `Place`: name, location, price, owner (User), amenities
- `Amenity`: name of feature (WiFi, AC, etc.)
- `Review`: text content, linked to a `User` and `Place`
- Relationship management (one-to-many, many-to-many)

---

### 2. 👤 User Endpoints

| Method | Endpoint        | Description          |
|--------|------------------|----------------------|
| POST   | `/users/`        | Create a user        |
| GET    | `/users/`        | Retrieve all users   |
| GET    | `/users/{id}`    | Get user by ID       |
| PUT    | `/users/{id}`    | Update user details  |

> ⚠️ Passwords are stored securely but not returned by the API.  
> 🚫 DELETE not implemented for Users.

---

### 3. 🏷️ Amenity Endpoints

| Method | Endpoint           | Description              |
|--------|---------------------|--------------------------|
| POST   | `/amenities/`       | Create an amenity        |
| GET    | `/amenities/`       | List all amenities       |
| GET    | `/amenities/{id}`   | Get a specific amenity   |
| PUT    | `/amenities/{id}`   | Update amenity details   |

> 🚫 DELETE not implemented

---

### 4. 🏠 Place Endpoints

| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| POST   | `/places/`       | Create a place                    |
| GET    | `/places/`       | List all places                   |
| GET    | `/places/{id}`   | Get place by ID + owner, amenities |
| PUT    | `/places/{id}`   | Update place details              |

> Includes data from related `User` and `Amenity` objects.  
> 🚫 DELETE not implemented

---

### 5. 📝 Review Endpoints

| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| POST   | `/reviews/`       | Create a review       |
| GET    | `/reviews/`       | List all reviews      |
| GET    | `/reviews/{id}`   | Get review by ID      |
| PUT    | `/reviews/{id}`   | Update a review       |
| DELETE | `/reviews/{id}`   | Delete a review       |

> ✅ DELETE is available only for `Review`.

---

# 🧪 HBnB API Testing Guide

This document describes how to run unit tests and perform manual testing using `curl` for your Flask REST API.

---

## 📦 Project Structure

```
project_root/
├── part2/
│   └── hbnb/
│       ├── app/
│       ├── tests/
│       │   ├── __init__.py
│       │   ├── test_users.py
│       │   ├── test_places.py
│       │   ├── test_amenities.py
│       │   ├── test_reviews.py
│       │   └── ...
│       ├── ...
│       └── app.py (or create_app.py)
```

---

## 🧪 Running Unit Tests

### ✅ Run All Tests:

Make sure your virtual environment is activated and the PYTHONPATH is set:

```bash
export PYTHONPATH=$PYTHONPATH:$(pwd)/part2/hbnb
python3 -m unittest discover part2/hbnb/tests
```

> All tests should pass:
> ```
> Ran 15 tests in 0.039s
> OK
> ```

---

## 🚀 Start the Flask API Server

Before using `curl`, run your Flask API server:

```bash
cd part2/hbnb
python3 app.py
```

> Make sure it's listening at: `http://localhost:5000`

---

## 🧪 Testing with `curl`

### 1. ✅ Create a User

```bash
curl -X POST http://localhost:5000/api/v1/users/ \
-H "Content-Type: application/json" \
-d '{
  "first_name": "Alice",
  "last_name": "Wonderland",
  "email": "alice@example.com"
}'
```
---

### 2. ✅ Create an Amenity

```bash
curl -X POST http://localhost:5000/api/v1/amenities/ \
-H "Content-Type: application/json" \
-d '{"name": "WiFi"}'
```

> Repeat for other amenities like `"Air Conditioning"`, `"Parking"`, etc.

### 🔍 List Amenities and Get Their IDs:

```bash
curl http://localhost:5000/api/v1/amenities/
```

---

### 3. ✅ Create a Place (use a valid user_id and amenity IDs)

```bash
curl -X POST http://localhost:5000/api/v1/places/ \
-H "Content-Type: application/json" \
-d '{
  "title": "Charming Loft",
  "description": "A cozy loft in the city center",
  "price": 120.5,
  "latitude": 48.8566,
  "longitude": 2.3522,
  "owner_id": "USER_ID",
  "amenities": ["AMENITY_ID_1", "AMENITY_ID_2"]
}'
```

---

### 4. ✅ Create a Review

```bash
curl -X POST http://localhost:5000/api/v1/reviews/ \
-H "Content-Type: application/json" \
-d '{
  "text": "Great location and clean space!",
  "rating": 5,
  "user_id": "USER_ID",
  "place_id": "PLACE_ID"
}'
```

---

### 📖 More Endpoints (GET Examples)

- List all users:  
  `curl http://localhost:5000/api/v1/users/`

- Get a user by ID:  
  `curl http://localhost:5000/api/v1/users/<user_id>`

- List all places:  
  `curl http://localhost:5000/api/v1/places/`

- Get a place by ID:  
  `curl http://localhost:5000/api/v1/places/<place_id>`

- Get all reviews for a place:  
  `curl http://localhost:5000/api/v1/reviews/places/<place_id>/reviews`

---

## ✅ Summary

| Test Type      | Description                        | Command |
|----------------|------------------------------------|---------|
| Unit Tests     | Run Python `unittest` suite        | `python3 -m unittest discover part2/hbnb/tests` |
| Manual API Test| Run server & use `curl` requests   | `curl -X ...` |
| API Docs       | Swagger (Flask-RESTx auto-gen)     | `http://localhost:5000/api/v1/` |

Make sure your data (user, amenity, etc.) exists before linking them together (like in reviews or places).

Happy testing! 🚀

## 📚 References

- [Flask](https://flask.palletsprojects.com/)
- [Flask-RESTx Docs](https://flask-restx.readthedocs.io/)
- [Facade Design Pattern - Refactoring.Guru](https://refactoring.guru/design-patterns/facade)
- [Python Project Structure Guide](https://docs.python-guide.org/writing/structure/)
- [REST API Best Practices](https://restfulapi.net/)

---

## ✍️ Author

Holberton School — HBnB Project   
Team: 👥 - [Mr Phillips](https://github.com/ddoudou7) - [Sofian](https://github.com/smessaoui31) - [Evgeni](https://github.com/Genia888)

---

