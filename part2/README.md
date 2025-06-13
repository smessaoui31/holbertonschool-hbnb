# C#26 :school: <img src="https://cdn.prod.website-files.com/6105315644a26f77912a1ada/63eea844ae4e3022154e2878_Holberton-p-800.png" width="150" /> - Part 2 - HBnB Team Project - 

## Overview

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