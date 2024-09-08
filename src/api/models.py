from flask_sqlalchemy import SQLAlchemy
import enum

db = SQLAlchemy()

class TravelerRole(enum.Enum):
    ADMIN = "ADMIN"
    TRAVELER = "TRAVELER"

# Tabla intermedia para la relación muchos a muchos entre usuarios y casas favoritas
favorite_houses = db.Table(
    'favorite_houses',
    db.Column('house_id', db.Integer, db.ForeignKey('house.id'), primary_key=True),
    db.Column('traveler_id', db.Integer, db.ForeignKey('traveler.id'), primary_key=True)
   
)
class Traveler(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userName = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    role = db.Column(db.Enum(TravelerRole, name="traveler_role"), nullable=False)
    
    favorite_houses = db.relationship('House', secondary=favorite_houses)
    reservations = db.relationship('Reservation', back_populates='traveler')

    def serialize(self):
        return {
            "id": self.id,
            "userName": self.userName,
            "email": self.email,
            "role": self.role,
            "reservations": [reservation.serialize() for reservation in self.reservations],  # Serializar reservas también
        }

class House(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    type = db.Column(db.String(200), unique=False, nullable=False)  
    nightly_rate = db.Column(db.Float, unique=False, nullable=False)   
    latitude = db.Column(db.String(120), unique=True, nullable=True)
    longitude = db.Column(db.String(120), unique=True, nullable=True) 
    
    # Campos para almacenar las URLs de las imágenes
    image1 = db.Column(db.String(250), unique=False, nullable=True)
    image2 = db.Column(db.String(250), unique=False, nullable=True)
    image3 = db.Column(db.String(250), unique=False, nullable=True)
    image4 = db.Column(db.String(250), unique=False, nullable=True)

    reservations = db.relationship('Reservation', back_populates='house')
    features = db.relationship('HouseFeatures', uselist=False, back_populates='house', cascade='all, delete-orphan')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "type": self.type,
            "nightly_rate": self.nightly_rate,
            "latitude": self.latitude,  
            "longitude": self.longitude,  # Cambiado para que sea "longitude"
            "image1": self.image1,
            "image2": self.image2,
            "image3": self.image3,
            "image4": self.image4,
            "features": self.features.serialize() if self.features else None,
        }


class HouseFeatures(db.Model):
    __tablename__ = 'house_features'
    
    id = db.Column(db.Integer, primary_key=True)
    house_id = db.Column(db.Integer, db.ForeignKey('house.id'), nullable=False)
    square_meters = db.Column(db.Float, nullable=False)
    bedrooms = db.Column(db.Integer, nullable=False)
    bathrooms = db.Column(db.Integer, nullable=False)
    has_pool = db.Column(db.Boolean, nullable=False, default=False)
    has_parking = db.Column(db.Boolean, nullable=False, default=False)
    
    # Relación con el modelo House
    house = db.relationship('House', back_populates='features')

    def __repr__(self):
        return f'<HouseFeatures House: {self.house_id}, Square Meters: {self.square_meters}, Bedrooms: {self.bedrooms}, Bathrooms: {self.bathrooms}>'

    def serialize(self):
        return {
            "id": self.id,
            "house_id": self.house_id,
            "square_meters": self.square_meters,
            "bedrooms": self.bedrooms,
            "bathrooms": self.bathrooms,
            "has_pool": self.has_pool,
            "has_parking": self.has_parking,
        }
    

class Reservation(db.Model):
    __tablename__ = 'reservations'
    
    id = db.Column(db.Integer, primary_key=True)
    traveler_id = db.Column(db.Integer, db.ForeignKey('traveler.id'), nullable=False)
    house_id = db.Column(db.Integer, db.ForeignKey('house.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='Pending')  # Pending, Confirmed, Canceled, etc.
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    # Relaciones
    traveler = db.relationship('Traveler', back_populates='reservations')
    house = db.relationship('House', back_populates='reservations')

    def __repr__(self):
        return f'<Reservation Traveler: {self.traveler_id}, House: {self.house_id}, From: {self.start_date}, To: {self.end_date}>'

    def serialize(self):
        return {
            "id": self.id,
            "traveler_id": self.traveler_id,
            "house_id": self.house_id,
            "start_date": self.start_date.isoformat(),
            "end_date": self.end_date.isoformat(),
            "status": self.status,
            "created_at": self.created_at.isoformat(),
        }
    
class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    ratings = db.Column(db.JSON, nullable=False)  # Storing ratings as JSON object
    message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    def __repr__(self):
        return f'<Feedback {self.name} - {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "ratings": self.ratings,
            "message": self.message,
            "created_at": self.created_at.isoformat(),
        }
