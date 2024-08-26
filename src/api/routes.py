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
        return jsonify({"message": "Email already in use"}), 409  

    try:
        # Create a new Traveler instance
        hashed_password = generate_password_hash(body['password'])
        new_traveler = Traveler(userName=body['userName'], email=body['email'], password=hashed_password)
        db.session.add(new_traveler)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201  
    except IntegrityError:
        db.session.rollback()  
        return jsonify({"message": "An error occurred during registration"}), 500  

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



# ENDPOINT CREAR CASAS RURALES

@api.route('/casasrurales', methods=['POST'])
@jwt_required()
def create_casa_rural():
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Invalid JSON"}), 400

    new_casa = CasaRural(
        name=body.get('name'),
        location=body.get('location'),
        price_per_night=body.get('price_per_night'),
        description=body.get('description')
    )
    db.session.add(new_casa)
    db.session.commit()

    return jsonify({"msg": "Casa rural created successfully", "casa": new_casa.id}), 201


# ENDPOINT MOSTRAR CASAS RURALES DISPONIBLES

@api.route('/casasrurales', methods=['GET'])
def get_all_casas_rurales():
    casas = CasaRural.query.all()
    casas_list = [{"id": casa.id, "name": casa.name, "location": casa.location, "price_per_night": casa.price_per_night} for casa in casas]
    return jsonify(casas_list), 200


# ENDPOINT CASAS RURALES POR ID

@api.route('/casasrurales/<int:id>', methods=['GET'])
def get_casa_rural(id):
    casa = CasaRural.query.get(id)

    if not casa:
        return jsonify({"msg": "Casa rural not found"}), 404

    return jsonify({
        "id": casa.id,
        "name": casa.name,
        "location": casa.location,
        "price_per_night": casa.price_per_night,
        "description": casa.description
    }), 200


# ENDPOINT PARA ACTUALIZAR DATOS DE CASAS RURALES 

@api.route('/casasrurales/<int:id>', methods=['PUT'])
@jwt_required()
def update_casa_rural(id):
    body = request.get_json()

    casa = CasaRural.query.get(id)

    if not casa:
        return jsonify({"msg": "Casa rural not found"}), 404

    casa.name = body.get('name', casa.name)
    casa.location = body.get('location', casa.location)
    casa.price_per_night = body.get('price_per_night', casa.price_per_night)
    casa.description = body.get('description', casa.description)

    db.session.commit()

    return jsonify({"msg": "Casa rural updated successfully"}), 200


# ENDPOINT PARA ELIMINAR CASAS RURALES 

@api.route('/casasrurales/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_casa_rural(id):
    casa = CasaRural.query.get(id)

    if not casa:
        return jsonify({"msg": "Casa rural not found"}), 404

    db.session.delete(casa)
    db.session.commit()

    return jsonify({"msg": "Casa rural deleted successfully"}), 200






