from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.services.facade import facade

api = Namespace('auth', description='Authentication operations')

# Model for input validation
login_model = api.model('Login', {
    'email': fields.String(required=True, description='User email'),
    'password': fields.String(required=True, description='User password')
})


@api.route('/login')
class Login(Resource):
    @api.expect(login_model)
    def post(self):
        """Authenticate user and return a JWT token"""
        credentials = api.payload
        
        # Step 1: Retrieve the user by email
        user = facade.get_user_by_email(credentials['email'])
        if not user or not user.check_password(credentials['password']):
            return {'error': 'Invalid credentials'}, 401
        
        # Step 2: Create JWT token
        access_token = create_access_token(
            identity={
                'id': str(user.id),
                'is_admin': user.is_admin
            }
        )
        return {'access_token': access_token}, 200


# Example protected endpoint to verify JWT
@api.route('/protected')
class ProtectedResource(Resource):
    @jwt_required()
    def get(self):
        """Example of a protected endpoint"""
        current_user = get_jwt_identity()
        return {
            'message': f"Hello, user {current_user['id']} (Admin: {current_user['is_admin']})"
        }, 200