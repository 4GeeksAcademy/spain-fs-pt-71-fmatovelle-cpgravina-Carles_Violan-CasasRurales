"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Traveler
from api.utils import generate_sitemap, APIException
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash, generate_password_hash


api = Flask(__name__)
api = Blueprint('api', __name__)


# ENDPOINT REGISTRO VIAJERO
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

    # Check if the email already exists
    existing_traveler = Traveler.query.filter_by(email=body['email']).first()
    if existing_traveler:
        return jsonify({"message": "Email already in use"}), 409  # 409 Conflict

    try:
        # Create a new Traveler instance
        hashed_password = generate_password_hash(body['password'])
        new_traveler = Traveler(userName=body['userName'], email=body['email'], password=hashed_password)
        db.session.add(new_traveler)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201  # 201 Created
    except IntegrityError:
        db.session.rollback()  # Rollback the session to undo any changes
        return jsonify({"message": "An error occurred during registration"}), 500  # 500 Internal Server Error

# Autenticación de usuarios para obtener el token JWT

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    if 'email' not in body or 'password' not in body:
        return jsonify({"msg": "You need to specify the email and password"}), 400

    traveler = Traveler.query.filter_by(email=body['email']).first()

    if traveler is None or not check_password_hash(traveler.password, body['password']):
        return jsonify({"msg": "Bad username or password"}), 401
    
    if traveler is None or not check_password_hash(traveler.password, body['password']):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=traveler.id)
    return jsonify(access_token=access_token), 200


# ENDPOINT PROTEGIDO VIAJERO

@api.route('/traveler/profile', methods=['GET'])
@jwt_required()
def get_traveler_profile():
    current_traveler_id = get_jwt_identity()
    current_traveler = Traveler.query.get(current_traveler_id)

    # if current_traveler.role != 'Traveler':
    #     return jsonify({'message': 'Cannot perform that function!'}), 403

     # ^^ ESTE SERIA INTERESANTE COMO FEATURE ADICIONAL, PARA DIFERENCIAR LOS TIPOS DE USUARIOS CON DIFERENTES FUNCIONALIDADES O ACCESOS. EJ. TRAVELER, PROVEEDOR, ADMIN. TOCARIA AGREGARLO EN EL MODELO^^ 

    profile = {
        "userName": current_traveler.userName,
        "email": current_traveler.email,
        # "joined_date": current_traveler.joined_date

        # ^^ ESTE SERIA INTERESANTE COMO FEATURE ADICIONAL, TOCARIA AGREGARLO EN EL MODELO^^ 
    }

    return jsonify(profile)



