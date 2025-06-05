### Sequence Diagram: Place Creation

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant PlaceService
    participant PlaceRepo
    participant DataBase

    Client->>API: POST /places
    API->>PlaceService: create_place(data)
    PlaceService->>PlaceRepo: save_place(data)
    PlaceRepo->>DB: INSERT INTO places ...
    DataBase-->>PlaceRepo: OK
    PlaceRepo-->>PlaceService: Place created
    PlaceService-->>API: Response(place_id)
    API-->>Client: 201 Created

