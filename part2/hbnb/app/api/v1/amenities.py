from flask_restx import Namespace, Resource, fields
from app.services.facade import facade

api = Namespace('amenities', description='Amenity operations')

# Define the amenity model for input validation and documentation
amenity_model = api.model('Amenity', {
    'name': fields.String(required=True, description='Name of the amenity')
})

@api.route('/')
class AmenityList(Resource):
    @api.expect(amenity_model)
    @api.response(201, 'Amenity successfully created')
    @api.response(400, 'Invalid input data')
    def post(self):
        """Register a new amenity"""
        # Placeholder for the logic to register a new amenity
        data = api.payload
        if not data.get("name"):
            return {'message': 'Name is required'}, 400
        try:
            new_amenity = facade.create_amenity(data)
            return new_amenity.to_dict(), 201
        except Exception as e:
            return {'message': str(e)}, 400

    @api.response(200, 'List of amenities retrieved successfully')
    def get(self):

        # Placeholder for logic to return a list of all amenities
        try:
            amenities = facade.get_all_amenities()
            return [a.to_dict() for a in amenities], 200
        except Exception as e:
            return {'message': str(e)}, 500  

@api.route('/<amenity_id>')
class AmenityResource(Resource):
    @api.response(200, 'Amenity details retrieved successfully')
    @api.response(404, 'Amenity not found')
    def get(self, amenity_id):
        """Get amenity details by ID"""
        # Placeholder for the logic to retrieve an amenity by ID
        amenity = facade.get_amenity(amenity_id)
        if amenity:
            return amenity.to_dict(), 200
        return {'message': 'Amenity not found'}, 404

    @api.expect(amenity_model)
    @api.response(200, 'Amenity updated successfully')
    @api.response(404, 'Amenity not found')
    @api.response(400, 'Invalid input data')
    def put(self, amenity_id):
        """Update an amenity's information"""
        # Placeholder for the logic to update an amenity by ID
        data = api.payload
        try:
            updated = facade.update_amenity(amenity_id, data)
            if updated:
                return updated.to_dict(), 200
            return {'message': 'Amenity not found'}, 404
        except Exception as e:
            return {'message': str(e)}, 400