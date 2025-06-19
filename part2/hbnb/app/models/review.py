from .basemodel import BaseModel

class Review(BaseModel):
    def __init__(self, text, user_id, place_id):
        super().__init__()
        self.text=text
        self.user_id=user_id
        self.place_id=place_id

def to_dict(self):
    return {
        "id": self.id,
        "text": self.text,
        "user_id": self.user_id,
        "place_id": self.place_id,
        "rating": self.rating,
        "created_at": self.created_at.isoformat(),
        "updated_at": self.updated_at.isoformat(),
    }

