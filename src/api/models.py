from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


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
    role = db.Column(db.String(20), unique=False, nullable=True, default='Traveler')

    favorite_houses = db.relationship('House', secondary=favorite_houses)

    def serialize(self):
        return {
            "id": self.id,
            "userName": self.userName,
            "email": self.email,
            # "role": self.role,  # Incluir el rol en la serialización
        }


class House(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=True, nullable=False)
    type = db.Column(db.String(200), unique=False, nullable=False)
    
    # Campos para almacenar las URLs de las imágenes
    image1 = db.Column(db.String(250), unique=False, nullable=True)
    image2 = db.Column(db.String(250), unique=False, nullable=True)
    image3 = db.Column(db.String(250), unique=False, nullable=True)
    image4 = db.Column(db.String(250), unique=False, nullable=True)

    def __repr__(self):
        return '<House %r>' % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "type": self.type,
            "image1": self.image1,
            "image2": self.image2,
            "image3": self.image3,
            "image4": self.image4,
        }