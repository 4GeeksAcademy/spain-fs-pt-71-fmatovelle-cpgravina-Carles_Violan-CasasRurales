"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Traveler
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def register_user():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'username' not in body:
        raise APIException('You need to specify the username', status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the email', status_code=400)

    new_traveler = Traveler(username=body['username'], email=body['email'])
    db.session.add(new_traveler)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 200
