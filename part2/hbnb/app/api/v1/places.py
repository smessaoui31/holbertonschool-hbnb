from flask_restx import Namespace, Resource, fields
from app.services import facade

api = Namespace ('places', description='Place operations')

# Define the models for related  entities
amenity_model = api.model('PlaceAmenity', {
    'id' : fields.String(description='Amenity ID'),
    'name' : fields.String(description='Name of the amenity')
})

user_model =  api.model('PlaceUser', {
    'id': fields.String(description='User ID'),
    'first_name': fields.String(description='First name of the owner'),
    'last_name' : fields.String(description='Last name of the owner'),
    'email' : fields.String(description='Email of the owner')

})
