### Sequence Diagram: Place Creation

```mermaid
sequenceDiagram
    participant User
    participant API
    participant PlaceService
    participant DataBase

    User->>API: Request to create a new place
    API->>PlaceService: Validate data and create place
    PlaceService->>DataBase: Save place to database
    DataBase-->>PlaceService: Return saved place with ID
    PlaceService-->>API: Return place object
    API-->>User: Response with success

