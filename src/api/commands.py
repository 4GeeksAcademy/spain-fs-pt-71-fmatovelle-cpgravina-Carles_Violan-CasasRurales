
# import click
from api.models import db, TravelerRole, Traveler, House, HouseFeatures, Reservation, Feedback

def build_test_user(user_name, role=TravelerRole.TRAVELER):
    user = Traveler()
    user.userName = user_name
    user.email = str(user_name) + "@test.com"
    user.password = "12345"
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
# class HouseFeatures(db.Model):
def insert_test_houses():
    print("\nCreating test houses with features")
    # for x in range(1, 6):
    #     user = Traveler()
    #     user.email = "test_user" + str(x) + "@test.com"
    #     user.password = "123456"
    #     user.is_active = True
    #     db.session.add(user)
    #     db.session.commit()
    #     print("User: ", user.email, " created.")
    print("All test houses with features created\n")

# class Reservation(db.Model):
def insert_test_reservations():
    print("\nCreating test reservations")
    # 
    # Buscar por "name" las casas a las que se le quiere hacer la reserva de prueba
    # 
    # for x in range(1, 6):
    #     user = Traveler()
    #     user.email = "test_user" + str(x) + "@test.com"
    #     user.password = "123456"
    #     user.is_active = True
    #     db.session.add(user)
    #     db.session.commit()
    #     print("User: ", user.email, " created.")
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
        insert_test_travelers()
        insert_test_houses()
        insert_test_reservations()
        insert_test_feedback()
        print("--- Creating test data | END ---\n\n")
        pass