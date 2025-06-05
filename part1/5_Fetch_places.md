### Sequence Diagram: Fetching a List of Places

sequenceDiagram
    participant Client
    participant API
    participant DataBase

    Client->>API: Get places (e.g., city=Paris)
    API->>DataBase: Filter by city
    API->>DataBase: Filter by price, guests, etc.
    DataBase-->>API: List of matching places
    API-->>Client: Results