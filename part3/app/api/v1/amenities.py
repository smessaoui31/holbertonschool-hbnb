from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt
from app.services.facade import facade

api = Namespace('amenities', description='Amenity operations')

# Define the amenity model
amenity_model = api.model('Amenity', {
    'name': fields.String(required=True, description='Name of the amenity')
})

@api.route('/')
class AmenityList(Resource):
    @api.expect(amenity_model)
    @api.response(201, 'Amenity successfully created')
    @api.response(400, 'Invalid input data')
    @api.response(403, 'Forbidden')
    @jwt_required()
    def post(self):
        """Register a new amenity (Admins only)"""
        claims = get_jwt()
        if not claims.get("is_admin", False):
            return {'error': 'Admins only'}, 403
        
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
        """Retrieve all amenities (public)"""
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
        """Get amenity details by ID (public)"""
        amenity = facade.get_amenity(amenity_id)
        if amenity:
            return amenity.to_dict(), 200
        return {'message': 'Amenity not found'}, 404

    @api.expect(amenity_model)
    @api.response(200, 'Amenity updated successfully')
    @api.response(404, 'Amenity not found')
    @api.response(400, 'Invalid input data')
    @api.response(403, 'Forbidden')
    @jwt_required()
    def put(self, amenity_id):
        """Update an amenity's information (Admins only)"""
        claims = get_jwt()
        if not claims.get("is_admin", False):
            return {'error': 'Admins only'}, 403

        data = api.payload
        try:
            updated = facade.update_amenity(amenity_id, data)
            if updated:
                return updated.to_dict(), 200
            return {'message': 'Amenity not found'}, 404
        except Exception as e:
            return {'message': str(e)}, 400