from .basemodel import BaseModel

class Amenity(BaseModel):
    def __init__(self, name):
        super().__init__()

        if not isinstance(name, str) or not name.strip():
            raise ValueError ("The amenities name must be a string available")
        
        self.name = name.strip()


    def __str__(self):
        # Retourne une représentation claire de l'amenity
        return f"[Amenity] ({self.id}) {self.name}"
    
    def to_dict(self):
        dict_repr = super().to_dict()  # hérite probablement d'un to_dict dans BaseModel
        dict_repr["name"] = self.name
        return dict_repr