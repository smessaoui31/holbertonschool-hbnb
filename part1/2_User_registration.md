### Sequence Diagram: User Registration

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant DataBase
    participant EmailService

    Client->>API: Register
    API->>DataBase: Save user(client)
    DataBase->>API: Send confirmation for the request (OK)
    API->> EmailService: Send confirmation email
    EmailService-->>API: Email sent
    API-->>Client: User created and email sent

