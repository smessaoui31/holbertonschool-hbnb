### Sequence Diagram: User Registration

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant UserService
    participant UserRepo
    participant DataBase

    Client->>API: POST /users/register
    API->>UserService: register_user(data)
    UserService->>UserRepo: save_user(data)
    UserRepo->>DB: INSERT INTO users ...
    DataBase-->>UserRepo: OK
    UserRepo-->>UserService: User created
    UserService-->>API: Response(user_id)
    API-->>Client: 201 Created

