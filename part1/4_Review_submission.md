### Sequence Diagram: Review Submission

```mermaid
sequenceDiagram
    participant User
    participant API
    participant ReviewService
    participant Database

    User->>API: Submit review (rating, comment)
    API->>ReviewService: Check and process review
    ReviewService->>Database: Save review
    Database-->>ReviewService: Confirm review saved
    ReviewService-->>API: Send confirmation
    API-->>User: Review submitted successfully