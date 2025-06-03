```mermaid
classDiagram
    class BaseModel {
        +UUID id
        +datetime created_at
        +datetime updated_at
        +save()
        +to_dict()
    }

    class User {
        +str email
        +str password
        +str first_name
        +str last_name
        +get_full_name()
    }

    class Place {
        +str name
        +str description
        +int number_rooms
        +int number_bathrooms
        +int max_guest
        +int price_by_night
        +float latitude
        +float longitude
        +str city_id
        +str user_id
        +add_amenity(Amenity)
        +get_amenities()
    }

    class Amenity {
        +str name
    }

    class Review {
        +str text
        +str user_id
        +str place_id
        +get_summary()
    }

    User --|> BaseModel
    Place --|> BaseModel
    Amenity --|> BaseModel
    Review --|> BaseModel

    Place --> "1" User : owned by
    Review --> "1" User : written by
    Review --> "1" Place : about
    Place o-- "*" Amenity : has