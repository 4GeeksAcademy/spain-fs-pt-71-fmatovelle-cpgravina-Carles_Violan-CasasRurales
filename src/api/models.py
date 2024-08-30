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
    # favorite_houses = db.relationship('Traveler', secondary=favorite_houses, backref=db.backref('favorited_by_travelers', lazy='dynamic'))
    favorite_houses = db.relationship('House', secondary=favorite_houses)
    
    # favorite = db.Column(db.Integer, unique=False, nullable=True)
    

    # def __repr__(self):
    #     return '<User %r>' % self.userName

    def serialize(self):
        return {
            "id": self.id,
            "userName": self.userName,
            "email": self.email,
            # do not serialize the password, its a security breach
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
