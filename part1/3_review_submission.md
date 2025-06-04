### Sequence Diagram: Review Submission

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant ReviewService
    participant ReviewRepo
    participant DB

    Client->>API: POST /reviews
    API->>ReviewService: submit_review(data)
    ReviewService->>ReviewRepo: save_review(data)
    ReviewRepo->>DB: INSERT INTO reviews ...
    DB-->>ReviewRepo: OK
    ReviewRepo-->>ReviewService: Review created
    ReviewService-->>API: Response(review_id)
    API-->>Client: 201 Created

