"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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

    new_user = User(username=body['username'], email=body['email'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 200

@api.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Test route is working!"}), 200

@api.route('/test-post', methods=['POST'])
def test_post_route():
    return jsonify({"message": "POST route is working!"}), 200

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200
