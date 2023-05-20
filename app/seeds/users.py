from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Boom', username='Demo', email='demo@aa.io', password='password', user_image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684000820/Demo_i4g1cz.png')
    marnie = User(
        first_name='Marnie', last_name='Alpha', username='marnie', email='marnie@aa.io', password='password', user_image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684001098/marnie_kg64zg.jpg')
    bobbie = User(
        first_name='Bobbie', last_name='Flay', username='bobbie', email='bobbie@aa.io', password='password', user_image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684001100/bobbie_a7bzoi.png')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
