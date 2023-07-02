from app.models import db, User, environment, SCHEMA
from app.models.likes import Like
from sqlalchemy.sql import text

def seed_likes():
    like_a = Like(
    )
    db.session.add(like_a)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
