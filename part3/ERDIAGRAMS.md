```mermaid
erDiagram
    USER ||--o{ PLACE : "has"
    USER ||--o{ REVIEW : "writes"
    PLACE ||--o{ REVIEW : "has"
    PLACE }|--|| CITY : "belongs"
    PLACE }|--|| STATE : "belongs"
    PLACE }|--|| USER : "owned"
    PLACE }|--|{ AMENITY : "has"
    AMENITY }|--|{ PLACE : "available"

    USER {
        string id PK
        string email
        string password
        string first_name
        string last_name
    }

    PLACE {
        string id PK
        string user_id FK
        string city_id FK
        string state_id FK
        string name
        string description
        number price_by_night
        number latitude
        number longitude
    }

    REVIEW {
        string id PK
        string user_id FK
        string place_id FK
        string text
    }

    CITY {
        string id PK
        string state_id FK
        string name
    }

    STATE {
        string id PK
        string name
    }

    AMENITY {
        string id PK
        string name
    }
    
```
