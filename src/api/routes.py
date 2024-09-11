"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, make_response
from flask_mail import Mail, Message
from api.models import db, Traveler, House, Feedback, Reservation
from api.utils import generate_sitemap, APIException
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, unset_jwt_cookies
from werkzeug.security import check_password_hash, generate_password_hash


api = Flask(__name__)
api = Blueprint('api', __name__)


# ENDPOINT REGISTRO TRAVELER

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
        new_traveler = Traveler(userName=body['userName'], email=body['email'], password=hashed_password, role="TRAVELER")
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
# Crear la respuesta utilizando make_response
    response = make_response(jsonify(response_body), 200)

    # Establecer la cookie si el rol es administrador
    if traveler_role == 'ADMIN':
        response.set_cookie('admin_token', access_token, httponly=True, samesite='Strict')

    return response

@api.route('/admin/logout', methods=['POST'])
@jwt_required()
def admin_logout():
    response = jsonify({"msg": "Admin logged out successfully"})
    unset_jwt_cookies(response)
    return response


# ENDPOINT PROTEGIDO TRAVELER

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




# ENDPOINT CREAR CASAS RURALES

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


# ENDPOINT MOSTRAR CASAS RURALES DISPONIBLES

@api.route('/houses', methods=['GET'])
def get_all_houses_by_id():
    houses = House.query.all()
    houses_list = [house.serialize() for house in houses]
    return jsonify(houses_list), 200


# ENDPOINT CASAS RURALES POR ID

@api.route('/houses/<int:id>', methods=['GET'])
def get_house_by_id(id):
    house = House.query.get(id)

    if not house:
        return jsonify({"msg": "House not found"}), 404

    return jsonify(house.serialize()), 200


# ENDPOINT PARA ACTUALIZAR/EDITAR DATOS DE CASAS RURALES 

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


# ENDPOINT PARA ELIMINAR CASAS RURALES 

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


# ENDPOINT PARA VER DETTALES ADICIONALES/ INFORMACION SENSIBLE: DESCRIPTION, PPN, AVAILABILITY, CONTACT INFO, SPECIFIC ADDRESS. SE NECESITARIA AGREGAR DATOS EN EL MODELO. 

# @api.route('/houses/<int:id>/details', methods=['GET'])
# @jwt_required()
# def get_house_details(house_id):
#     house = House.query.get(house_id)
#     if house is None:
#         return jsonify({"msg": "House not found"}), 404
    
#     return jsonify(house.serialize_details()), 200


# ENDPOINT SUBMIT-FEEDBACK

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

# # ENDPOINT PROTEGIDO CREATE RESERVATION

# @api.route('/reservations', methods=['POST'])
# @jwt_required()
# def create_reservation():
#     body = request.get_json()
#     current_user_id = get_jwt_identity()

#     # Extract and validate input data
#     house_id = body.get('house_id')
#     start_date = body.get('start_date')
#     end_date = body.get('end_date')

#     if not house_id or not start_date or not end_date:
#         return jsonify({"msg": "Missing required data"}), 400

#     # Check house availability
#     existing_reservations = Reservation.query.filter(
#         Reservation.house_id == house_id,
#         Reservation.end_date >= start_date,
#         Reservation.start_date <= end_date
#     ).all()

#     if existing_reservations:
#         return jsonify({"msg": "House is not available for the selected dates"}), 400

#     # Create new reservation
#     new_reservation = Reservation(
#         traveler_id=current_user_id,
#         house_id=house_id,
#         start_date=start_date,
#         end_date=end_date,
#         status='Pending'  # Default status
#     )
#     db.session.add(new_reservation)
#     db.session.commit()

#     return jsonify(new_reservation.serialize()), 201


# # ENDPOINT PROTEGIDO VIEW RESERVATION

# ENDPOINT PROTEGIDO VIEW RESERVATION

@api.route('/reservations', methods=['GET'])
@jwt_required()
def get_reservations():
    current_user_id = get_jwt_identity()
    
    # Retrieve reservations for the logged-in user
    reservations = Reservation.query.filter_by(traveler_id=current_user_id).all()
    reservations_list = [reservation.serialize() for reservation in reservations]

    return jsonify(reservations_list), 200


# # ENDPOINT PROTEGIDO UPDATE RESERVATIONS

# @api.route('/reservations/<int:id>', methods=['PUT'])
# @jwt_required()
# def update_reservation(id):
#     body = request.get_json()
#     current_user_id = get_jwt_identity()

#     # Retrieve reservation by ID
#     reservation = Reservation.query.get(id)
#     if not reservation or reservation.traveler_id != current_user_id:
#         return jsonify({"msg": "Reservation not found or unauthorized"}), 404

#     # Update reservation details
#     reservation.start_date = body.get('start_date', reservation.start_date)
#     reservation.end_date = body.get('end_date', reservation.end_date)
#     reservation.status = body.get('status', reservation.status)

#     db.session.commit()

#     return jsonify(reservation.serialize()), 200


# # ENDPOINT PROTEGIDO CANCEL RESERVATION

# @api.route('/reservations/<int:id>', methods=['DELETE'])
# @jwt_required()
# def cancel_reservation(id):
#     current_user_id = get_jwt_identity()

#     # Retrieve reservation by ID
#     reservation = Reservation.query.get(id)
#     if not reservation or reservation.traveler_id != current_user_id:
#         return jsonify({"msg": "Reservation not found or unauthorized"}), 404

#     # Cancel the reservation
#     reservation.status = 'Canceled'
#     db.session.commit()

#     return jsonify({"msg": "Reservation canceled successfully"}), 200


# ENDPOINT PROTEGIDO CHECKOUT

# ENDPOINT PROTEGIDO CHECKOUT

@api.route('/checkout', methods=['POST'])
@jwt_required()
def checkout():
    """
    Endpoint to finalize a reservation by processing a payment and confirming it.
    """
    body = request.get_json()
    current_traveler_id = get_jwt_identity()  # Get the ID of the logged-in user
    current_traveler = Traveler.query.get(current_traveler_id)

    traveler_role = current_traveler.role.value

    # Debugging: Print current traveler details
    print(f"Traveler ID: {current_traveler_id}, Role: {traveler_role}")

    if traveler_role != 'TRAVELER': 
        return jsonify({"msg": "Access forbidden: Only travelers can perform checkout."}), 403

    # Validate request data
    reservation_id = body.get('reservation_id')
    payment_details = body.get('payment_details')

    # Debugging: Print reservation ID and payment details
    print(f"Reservation ID: {reservation_id}, Payment Details: {payment_details}")

    if not reservation_id or not payment_details:
        return jsonify({"msg": "Missing reservation ID or payment details"}), 400

    # Retrieve reservation and validate ownership
    reservation = Reservation.query.filter_by(id=reservation_id, traveler_id=current_traveler_id).first()
    # Debugging: Print retrieved reservation details
    print(f"Retrieved Reservation: {reservation}")

    if not reservation:
        return jsonify({"msg": "Reservation not found or unauthorized"}), 404

    # Check if the reservation is already confirmed
    if reservation.status == 'Confirmed':
        return jsonify({"msg": "Reservation is already confirmed"}), 400

    # Payment processing logic (this is a mock example)
    payment_successful = process_payment(payment_details)  # Replace with actual payment integration logic

    if not payment_successful:
        return jsonify({"msg": "Payment failed"}), 402  # 402 Payment Required is an appropriate status code here

    # Update reservation status to confirmed if payment is successful
    reservation.status = 'Confirmed'
    db.session.commit()

    return jsonify({"msg": "Checkout successful, reservation confirmed", "reservation": reservation.serialize()}), 200

def process_payment(payment_details):
    """
    Mock function to process payment. Replace this with real payment gateway integration.
    """
    # Perform payment gateway integration here (e.g., Stripe, PayPal, etc.)
    # For now, we'll just simulate a successful payment.
    return True  # Simulating successful payment

#Terminar checkout 
# probar en postman 
# hacer fetch para guardar info en bd
#  
@api.route('/send-email', methods=['POST'])
@jwt_required()
def send_email():
    # Retrieve the current user
    current_user_id = get_jwt_identity()
    current_user = Traveler.query.get(current_user_id)

    # Check user role (you might have different roles or logic)
    if current_user.role.value.strip().upper() != 'TRAVELER':
        return jsonify({'message': 'Cannot perform that function!'}), 403

    # Extract email details from request
    data = request.json
    recipient_email = data.get('recipient_email')
    subject = data.get('subject', 'No Subject')
    body = data.get('body', 'No Body Content')

    if not recipient_email or not subject or not body:
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        # Create the email message
        msg = Message(subject=subject,
                      recipients=[recipient_email],
                      body=body)
        
        # Send the email
        mail.send(msg)
        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
