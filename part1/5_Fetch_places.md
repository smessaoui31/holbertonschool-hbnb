### Sequence Diagram: Fetching Places

```mermaid
sequenceDiagram
    participant User
    participant API
    participant Logic
    participant DataBase

    User->>API: GET /places?city=Paris
    API->>Logic: get places by city
    Logic->DataBase: Query places based on the criterias
    DataBase-->>Logic: List of places
    Logic-->>API: Return List
    API-->>User: List of places successfully returned
