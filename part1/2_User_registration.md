### Sequence Diagram: User Registration

```mermaid
sequenceDiagram
    participant User
    participant API
    participant DataBase
    participant EmailService

    User->>API: Register
    API->>DataBase: Save User
    DataBase->>API: Send confirmation for the request (OK)
    API->> EmailService: Send confirmation email
    EmailService-->>API: Email sent
    API-->>User: User created and email sent

