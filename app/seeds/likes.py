from app.models import db, User, environment, SCHEMA
from app.models.likes import Like
from sqlalchemy.sql import text

def seed_likes():
    like_a = Like(
        likeable_type = 'recipe',
        likeable_id = 1,
        owner_id = 3
    )
    like_b = Like(
        likeable_type = 'recipe',
        likeable_id = 2,
        owner_id = 1
    )
    like_c = Like(
        likeable_type = 'recipe',
        likeable_id = 3,
        owner_id = 2
    )
    like_d = Like(
        likeable_type = 'recipe',
        likeable_id = 3,
        owner_id = 1
    )
    like_e = Like(
        likeable_type = 'user',
        likeable_id = 3,
        owner_id = 1
    )
    like_f = Like(
        likeable_type = 'user',
        likeable_id = 3,
        owner_id = 2
    )
    # like_g = Like(
    #     likeable_type = 'user',
    #     likeable_id = 1,
    #     owner_id = 2
    # )
    like_h = Like(
        likeable_type = 'user',
        likeable_id = 1,
        owner_id = 3
    )
    db.session.add(like_a)
    db.session.add(like_b)
    db.session.add(like_c)
    db.session.add(like_d)
    db.session.add(like_e)
    db.session.add(like_f)
    # db.session.add(like_g)
    db.session.add(like_h)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
