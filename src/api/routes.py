import os
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from flask_mail import Message
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.security import check_password_hash, generate_password_hash

from mail import mail
from api.models import db, Traveler, House, Feedback, Reservation
from api.utils import generate_sitemap, APIException


api = Flask(__name__)
api = Blueprint('api', __name__)

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
    existing_traveler = Traveler.query.filter_by(email=body['email']).first()
    if existing_traveler:
        return jsonify({"message": "Email already in use"}), 409  
    try:
        hashed_password = generate_password_hash(body['password'])
        new_traveler = Traveler(userName=body['userName'], email=body['email'], password=hashed_password, role="TRAVELER")
        db.session.add(new_traveler)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201  
    except IntegrityError:
        db.session.rollback()  
        return jsonify({"message": "An error occurred during registration"}), 500  
    
@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if 'userName' not in body or 'password' not in body:
        return jsonify({"msg": "You need to specify the userName and password"}), 400
    traveler = Traveler.query.filter_by(userName=body['userName']).first()
    if traveler is None or not check_password_hash(traveler.password, body['password']):
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=traveler.id)
    traveler_role = traveler.role.name.upper() if hasattr(traveler.role, 'name') else traveler.role
    response_body = {
        "access_token": access_token,
        "role": traveler_role 
    }
    response = make_response(jsonify(response_body), 200)
    if traveler_role == 'ADMIN':
        response.set_cookie('admin_token', access_token, httponly=True, samesite='Strict')
    return response

@api.route('/admin/logout', methods=['POST'])
@jwt_required()
def admin_logout():
    response = jsonify({"msg": "Admin logged out successfully"})
    unset_jwt_cookies(response)
    return response

@api.route('/traveler/profile', methods=['GET'])
@jwt_required()
def get_traveler_profile():
    current_traveler_id = get_jwt_identity()
    current_traveler = Traveler.query.get(current_traveler_id)
    traveler_role = current_traveler.role.value
    if traveler_role.strip().upper() != 'TRAVELER':
        return jsonify({'message': 'Cannot perform that function!'}), 403
    profile = {
        "userName": current_traveler.userName,
        "email": current_traveler.email,
    }
    return jsonify(profile), 200

@api.route('/houses', methods=['POST'])
@jwt_required()
def create_house():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Invalid JSON"}), 400
    current_traveler_id = get_jwt_identity()
    current_traveler = Traveler.query.get(current_traveler_id)
    traveler_role = current_traveler.role.value
    if traveler_role != 'ADMIN':  
        return jsonify({"msg": "Access forbidden: Only admins can create houses."}), 403
    new_house = House(
        name=body.get('name'),
        address=body.get('address'),
        type=body.get('type'),
        nightly_rate=body.get('nightly_rate'),
        image1=body.get('image1'),
        image2=body.get('image2'),
        image3=body.get('image3'),
        image4=body.get('image4')
    )
    db.session.add(new_house)
    db.session.commit()
    return jsonify({"msg": "House created successfully", "house": new_house.serialize()}), 201

@api.route('/houses', methods=['GET'])
def get_all_houses_by_id():
    houses = House.query.all()
    houses_list = [house.serialize() for house in houses]
    return jsonify(houses_list), 200

@api.route('/houses/<int:id>', methods=['GET'])
def get_house_by_id(id):
    house = House.query.get(id)
    if not house:
        return jsonify({"msg": "House not found"}), 404
    return jsonify(house.serialize()), 200


@api.route('/houses/<int:id>', methods=['PUT'])
@jwt_required()
def update_house_by_id(id):
    body = request.get_json()
    house = House.query.get(id)
    if not house:
        return jsonify({"msg": "House not found"}), 404
    current_traveler_id = get_jwt_identity()
    current_traveler = Traveler.query.get(current_traveler_id)
    traveler_role = current_traveler.role.value
    if traveler_role != 'ADMIN':  
        return jsonify({"msg": "Access forbidden: Only admins can update house information."}), 403
    house.name = body.get('name', house.name)
    house.address = body.get('address', house.address)
    house.type = body.get('type', house.type)
    house.image1 = body.get('image1', house.image1)
    house.image2 = body.get('image2', house.image2)
    house.image3 = body.get('image3', house.image3)
    house.image4 = body.get('image4', house.image4)
    db.session.commit()
    return jsonify({"msg": "House updated successfully", "house": house.serialize()}), 200

@api.route('/houses/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_house_by_id(id):
    house = House.query.get(id)
    if not house:
        return jsonify({"msg": "House not found"}), 404
    current_traveler_id = get_jwt_identity()
    current_traveler = Traveler.query.get(current_traveler_id)
    traveler_role = current_traveler.role.value
    if traveler_role != 'ADMIN':  
        return jsonify({"msg": "Access forbidden: Only admins can delete houses."}), 403
    db.session.delete(house)
    db.session.commit()
    return jsonify({"msg": "House deleted successfully"}), 200

@api.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    data = request.json
    new_feedback = Feedback(
        name=data['name'],
        email=data['email'],
        ratings=data['ratings'],
        message=data.get('message')
  )
    db.session.add(new_feedback)
    db.session.commit()
    return jsonify({"message": "Feedback submitted successfully!"}), 201

@api.route('/reservations', methods=['GET'])
@jwt_required()
def get_reservations():
    current_user_id = get_jwt_identity()
    reservations = Reservation.query.filter_by(traveler_id=current_user_id).all()
    reservations_list = [reservation.serialize() for reservation in reservations]
    return jsonify(reservations_list), 200

@api.route('/checkout', methods=['POST'])
@jwt_required()
def checkout():
    body = request.get_json()
    current_traveler_id = get_jwt_identity()
    current_traveler = Traveler.query.get(current_traveler_id)
    traveler_role = current_traveler.role.value
    if traveler_role != 'TRAVELER':  
        return jsonify({"msg": "Access forbidden: Only Travelers checkout."}), 403
    reservation_id = body.get('reservation_id')
    payment_method = body.get('payment_method')
    if not reservation_id or not payment_method:
        return jsonify({"msg": "Reservation ID and payment method are required"}), 400
    reservation = Reservation.query.filter_by(id=reservation_id, traveler_id=current_traveler_id).first()
    if not reservation:
        return jsonify({"msg": "Reservation not found or unauthorized"}), 404
    if reservation.status == 'Confirmed':
        return jsonify({"msg": "Reservation is already confirmed"}), 400
    if payment_method == 'Transfer':
        payment_successful = process_bank_transfer(body)
    else:
        return jsonify({"msg": "Payment method not supported"}), 400
    if payment_successful:
        reservation.status = 'Confirmed'
        db.session.commit()
        return jsonify({"msg": "Payment successful. Reservation confirmed.", "reservation": reservation.serialize()}), 200
    else:
        return jsonify({"msg": "Payment failed"}), 402
def process_bank_transfer(payment_details):
    print("Processing bank transfer with details:", payment_details)
    return True  


#Terminar checkout 
# probar en postman 
# hacer fetch para guardar info en bd
# 

@api.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    subject = data.get('subject')
    recipient = data.get('recipient')
    body = data.get('body')

    msg = Message(subject, recipients=[recipient])
    msg.body = body

    mail.send(msg)
    return jsonify({"message": "Email sent successfully"}), 200







