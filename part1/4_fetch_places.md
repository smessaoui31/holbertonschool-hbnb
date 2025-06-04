### Sequence Diagram: Fetching a List of Places

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant PlaceService
    participant PlaceRepo
    participant DB

    Client->>API: GET /places?city_id=123
    API->>PlaceService: get_places_by_city(123)
    PlaceService->>PlaceRepo: fetch_places(city_id)
    PlaceRepo->>DB: SELECT * FROM places WHERE city_id=123
    DB-->>PlaceRepo: List of places
    PlaceRepo-->>PlaceService: Places found
    PlaceService-->>API: Response(place_list)
    API-->>Client: 200 OK + places[]
