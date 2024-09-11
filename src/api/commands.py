from werkzeug.security import generate_password_hash
from api.models import db, TravelerRole, Traveler, House, HouseFeatures, Reservation, Feedback
from datetime import datetime, timedelta
import random

def build_test_user(user_name, role=TravelerRole.TRAVELER):
    hashed_password = generate_password_hash("12345")
    user = Traveler()
    user.userName = user_name
    user.email = str(user_name) + "@test.com"
    user.password = hashed_password
    user.role = role
    return user

def insert_test_travelers():
    print("\nCreating test users")
    admin1 = build_test_user("carles", TravelerRole.ADMIN)
    admin2 = build_test_user("camille", TravelerRole.ADMIN)
    admin3 = build_test_user("federico", TravelerRole.ADMIN)
    db.session.add(admin1)
    db.session.add(admin2)
    db.session.add(admin3)
    db.session.commit()
    for x in range(1, 6):
        user = build_test_user("test_user" + str(x))
        db.session.add(user)
        db.session.commit()
        print("User: ", user.email, " created.")
    print("All test users created\n")

# class House(db.Model):

def insert_test_houses():
    print("\nCreating test houses with features")
    # for x in range(1, 6):
    house1 = House()
    house1.name = "Cozy cave house"
    house1.address = "Calle de la Encina, 328792, Miraflores de la Sierra, Madrid Spain"
    house1.type = "cave house"
    house1.nightly_rate = "8"
    house1.latitude = "40.942065"
    house1.longitude = "-3.534001"

    house1.image1 = "https://i.imgur.com/g3swYoT.jpg"
    house1.image2 = "https://i.imgur.com/CC3b8UM.jpg"
    house1.image3 = "https://i.imgur.com/aes0DTL.jpg"
    house1.image4 = "https://i.imgur.com/p9coO9C.jpg"
 

    db.session.add(house1)
    #db.session.commit()
    print("House: ", house1.name, " created.")

    house2 = House()
    house2.name = "Sunny cottage"
    house2.address = "Carrer de la Lluna, 23 08001 Barcelona, Spain"
    house2.type = "cottage"
    house2.nightly_rate = "7"
    house2.latitude = "41.381555"
    house2.longitude = "2.165592"
    house2.image1 = "https://i.imgur.com/XfqDcv7.jpg"
    house2.image2 = "https://i.imgur.com/L1Xa7Y0.jpg"
    house2.image3 = "https://i.imgur.com/eI5IyWd.jpg"
    house2.image4 = "https://i.imgur.com/6KMigl3.jpg"

    db.session.add(house2)
    #db.session.commit()
    print("House: ", house2.name, " created.")

    house3 = House()
    house3.name = "Quiet farmhouse"
    house3.address = "Avinguda del Bosque, 9 08035, Barcelona Spain"
    house3.type = "farmHouse"
    house3.nightly_rate = "10"
    house3.latitude = "41.407114"
    house3.longitude = "21.461499"
    house3.image1 = "https://i.imgur.com/XqOzukN.jpg"
    house3.image2 = "https://i.imgur.com/L1Xa7Y0.jpg"
    house3.image3 = "https://i.imgur.com/eI5IyWd.jpg"
    house3.image4 = "https://i.imgur.com/6KMigl3.jpg"

    db.session.add(house3)
    #db.session.commit()
    print("House: ", house3.name, " created.")

    house4 = House()
    house4.name = "Peaceful cabin"
    house4.address = "Camino de los Olivos, 2528460, Los Molinos, Madrid Spain"
    house4.type = "cabin"
    house4.nightly_rate = "6"
    house4.latitude = "40.083295"
    house4.longitude = "-3.563956"
    house4.image1 = "https://i.imgur.com/eMQn23s.jpg"
    house4.image2 = "https://imgur.com/L6Ihg8J.jpg"
    house4.image3 = "https://i.imgur.com/gJozx6T.jpg"
    house4.image4 = "https://i.imgur.com/gsdJ9Jl.jpg"

    db.session.add(house4)
    #db.session.commit()
    print("House: ", house4.name, " created.")

    house5 = House()
    house5.name = "Rustic house"
    house5.address = "Camí de la Serra, 18 46167, Chulilla, Valencia Spain"
    house5.type = "house"
    house5.nightly_rate = "12"
    house5.latitude = "39.655620"
    house5.longitude = "-0.891943"
    house5.image1 = "https://i.imgur.com/HBF7Djo.jpg"
    house5.image2 = "https://i.imgur.com/jonzS53.jpg"
    house5.image3 = "https://i.imgur.com/2lL9DqR.jpg"
    house5.image4 = "https://i.imgur.com/u3InJnj.jpg"

    db.session.add(house5)
    db.session.commit()
    print("House: ", house5.name, " created.")

    house6 = House()
    house6.name = "Quiet cabin"
    house6.address = "123 Calle del Sol, Valencia, 46001, Spain"
    house6.type = "cabin"
    house6.nightly_rate = "11"
    house6.latitude = "39.418303"
    house6.longitude = "-0.391967"
    house6.image1 = "https://i.imgur.com/kxJ8JxZ.jpg"
    house6.image2 = "https://i.imgur.com/HlHWAVt.jpg"
    house6.image3 = "https://i.imgur.com/k8zFwSG.jpg"
    house6.image4 = "https://i.imgur.com/PvhO9V1.jpg"

    db.session.add(house6)
    db.session.commit()
    print("House: ", house6.name, " created.")

    house7 = House()
    house7.name = "Charming barn"
    house7.address = "La Esperanza Camino de los Robles, s/n 29650 Mijas Málaga, Spain"
    house7.type = "barn"
    house7.nightly_rate = "8"
    house7.latitude = "36.596988"
    house7.longitude = "-4.632343"
    house7.image1 = "https://i.imgur.com/5H9PM86.jpg"
    house7.image2 = "https://i.imgur.com/15Rrh0P.jpg"
    house7.image3 = "https://i.imgur.com/b1qTgVL.jpg"
    house7.image4 = "https://i.imgur.com/S3iGt3f.jpg"

    db.session.add(house7)
    db.session.commit()
    print("House: ", house7.name, " created.")


    house8 = House()
    house8.name = "Serene bungalow"
    house8.address = "Calle de Gran Vía, 45 48011 Bilbao Spain"
    house8.type = "bungalow"
    house8.nightly_rate = "12"
    house8.latitude = "43.263415"
    house8.longitude = "-2.937114"
    house8.image1 = "https://i.imgur.com/CVFHvRj.jpg"
    house8.image2 = "https://i.imgur.com/Qht70Tf.jpg"
    house8.image3 = "https://i.imgur.com/xJpqrXg.jpg"
    house8.image4 = "https://i.imgur.com/TvNgE0M.jpg"

    db.session.add(house8)
    db.session.commit()
    print("House: ", house8.name, " created.")

    house9 = House()
    house9.name = "Quiet house"
    house9.address = "Calle del Silencio 8 29005 Málaga Spain"
    house9.type = "house"
    house9.nightly_rate = "7"
    house9.latitude = "36.719777"
    house9.longitude = "-4.424009"
    house9.image1 = "https://i.imgur.com/MNOi5Gw.jpg"
    house9.image2 = "https://i.imgur.com/zspEI46.jpg"
    house9.image3 = "https://i.imgur.com/rHzBnxo.jpg"
    house9.image4 = "https://i.imgur.com/wc1njIA.jpg"

    db.session.add(house9)
    db.session.commit()
    print("House: ", house9.name, " created.")

    print("All test houses without features created\n")

    house10 = House()
    house10.name = "Rustic lodge"
    house10.address = "Calle del Tranquilo 12 50003 Zaragoza Spain"
    house10.type = "lodge"
    house10.nightly_rate = "8"
    house10.latitude = "41.652940"
    house10.longitude = "-0.880562"
    house10.image1 = "https://i.imgur.com/awwJ6Mn.jpg"
    house10.image2 = "https://i.imgur.com/k19jRXm.jpg"
    house10.image3 = "https://i.imgur.com/ddYV1z1.jpg"
    house10.image4 = "https://i.imgur.com/im2zWIc.jpg"

    db.session.add(house10)
    db.session.commit()
    print("House: ", house10.name, " created.")

    print("All test houses without features created\n")


# class HouseFeatures(db.Model):
def insert_test_housesFeatures():
    print("\nCreating features for test houses")
    
    # Buscar cada casa por su nombre y asignarles características
    house1 = House.query.filter_by(name="Cozy cave house").first()
    if house1:
        features1 = HouseFeatures(
            house_id=house1.id,
            square_meters=85,
            bedrooms=2,
            bathrooms=1,
            has_pool=True,
            has_parking=True
        )
        db.session.add(features1)

    house2 = House.query.filter_by(name="Sunny cottage").first()
    if house2:
        features2 = HouseFeatures(
            house_id=house2.id,
            square_meters=120,
            bedrooms=3,
            bathrooms=2,
            has_pool=False,
            has_parking=True
        )
        db.session.add(features2)

    house3 = House.query.filter_by(name="Quiet farmhouse").first()
    if house3:
        features3 = HouseFeatures(
            house_id=house3.id,
            square_meters=150,
            bedrooms=4,
            bathrooms=2,
            has_pool=True,
            has_parking=False
        )
        db.session.add(features3)

    house4 = House.query.filter_by(name="Peaceful cabin").first()
    if house4:
        features4 = HouseFeatures(
            house_id=house4.id,
            square_meters=90,
            bedrooms=2,
            bathrooms=1,
            has_pool=False,
            has_parking=True
        )
        db.session.add(features4)

    house5 = House.query.filter_by(name="Rustic house").first()
    if house5:
        features5 = HouseFeatures(
            house_id=house5.id,
            square_meters=110,
            bedrooms=3,
            bathrooms=2,
            has_pool=True,
            has_parking=True
        )
        db.session.add(features5)

    house6 = House.query.filter_by(name="Quiet cabin").first()
    if house6:
        features6 = HouseFeatures(
            house_id=house6.id,
            square_meters=70,
            bedrooms=1,
            bathrooms=1,
            has_pool=True,
            has_parking=True
        )
        db.session.add(features6)
    
    house7 = House.query.filter_by(name="Charming barn").first()
    if house7:
        features7 = HouseFeatures(
            house_id=house7.id,
            square_meters=160,
            bedrooms=2,
            bathrooms=2,
            has_pool=False,
            has_parking=True
        )
        db.session.add(features7)

    house8 = House.query.filter_by(name="Serene bungalow").first()
    if house8:
        features8 = HouseFeatures(
            house_id=house8.id,
            square_meters=110,
            bedrooms=2,
            bathrooms=2,
            has_pool=True,
            has_parking=True
        )
        db.session.add(features8)

    db.session.commit()
    print("All features for test houses created\n")

    house9 = House.query.filter_by(name="Quiet house").first()
    if house9:
        features9 = HouseFeatures(
            house_id=house9.id,
            square_meters=120,
            bedrooms=3,
            bathrooms=2,
            has_pool=True,
            has_parking=True
        )
        db.session.add(features9)

    house10 = House.query.filter_by(name="Rustic lodge").first()
    if house10:
        features10 = HouseFeatures(
            house_id=house10.id,
            square_meters=180,
            bedrooms=4,
            bathrooms=3,
            has_pool=True,
            has_parking=True
        )
        db.session.add(features10)

    db.session.commit()
    print("All features for test houses created\n")


# class Reservation(db.Model):
def insert_test_reservations():
    print("\nCreating test reservations")

    # Obtener todos los usuarios que no son administradores (Travelers)
    travelers = Traveler.query.filter(Traveler.role == TravelerRole.TRAVELER).all()

    # Obtener todas las casas
    houses = House.query.all()

    # Generar 3 reservas por cada usuario en diferentes casas
    for traveler in travelers:
        reserved_houses = set()  # Para evitar que un usuario reserve la misma casa dos veces
        
        for _ in range(3):
            # Elegir una casa aleatoria que aún no haya sido reservada por este usuario
            available_houses = [house for house in houses if house not in reserved_houses]
            house = random.choice(available_houses)

            # Definir fechas aleatorias para la reserva
            start_date = datetime.now() + timedelta(days=random.randint(1, 30))
            end_date = start_date + timedelta(days=random.randint(1, 7))

            # Crear la reserva
            reservation = Reservation(
                traveler_id=traveler.id,
                house_id=house.id,
                start_date=start_date,
                end_date=end_date,
                total_price=(end_date - start_date).days * house.nightly_rate
            )

            # Añadir la reserva a la sesión
            db.session.add(reservation)

            # Marcar la casa como reservada por este usuario
            reserved_houses.add(house)

        db.session.commit()
        print(f"Reservations created for user: {traveler.userName}")

    print("All test reservations created\n")


# class Feedback(db.Model):
def insert_test_feedback():
    print("\nCreating test feedback")
    # for x in range(1, 6):
    #     user = Traveler()
    #     user.email = "test_user" + str(x) + "@test.com"
    #     user.password = "123456"
    #     user.is_active = True
    #     db.session.add(user)
    #     db.session.commit()
    #     print("User: ", user.email, " created.")
    print("All test feedback created\n")

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    @app.cli.command("insert-test-data")
    def insert_test_data():
        print("\n\n--- Creating test data | START ---")
        #insert_test_travelers()
        #insert_test_houses()
        #insert_test_housesFeatures() 
        insert_test_reservations()
       #insert_test_feedback()
        print("--- Creating test data | END ---\n\n")
        pass