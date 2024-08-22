"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Traveler
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

# from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask import Flask

api = Flask(__name__)
CORS(api)

# api = Flask(__name__)

# Configuración de la clave secreta para JWT
# api.config['JWT_SECRET_KEY'] = 'tu-clave-secreta-aqui'  # Cambia esto por una clave secreta segura en producción

# Inicializar JWTManager con la aplicación Flask
# jwt = JWTManager(api)

# Resto de tu configuración y rutas aquí...

api = Blueprint('api', __name__)




# Inicializar JWTManager con la aplicación Flask
# jwt = JWTManager(api)

@api.route('/register', methods=['POST'])
def register_user():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'userName' not in body:
        raise APIException('You need to specify the userName', status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email', status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the password', status_code=400)

    # Usa 'userName' en lugar de 'username'
    new_traveler = Traveler(userName=body['userName'], email=body['email'], password=body['password'])
    db.session.add(new_traveler)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 200

# @api.route('/test', methods=['GET'])
# def test_route():
#     return jsonify({"message": "Test route is working!"}), 200

# @api.route('/test-post', methods=['POST'])
# def test_post_route():
#     return jsonify({"message": "POST route is working!"}), 200



# Autenticación de usuarios para obtener el token JWT
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200
