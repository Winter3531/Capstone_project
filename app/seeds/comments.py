from app.models import db, User, environment, SCHEMA
from app.models.comment import Comment
from sqlalchemy.sql import text


def seed_comments():
    comment_a = Comment(
        owner_id= 3,
        recipe_id= 1,
        comment='Great family meal!'
,    )
    comment_b = Comment(
        owner_id= 2,
        recipe_id= 1,
        comment='Meal was great, I reccomend adding black olives.'
    )

    comment_c = Comment(
        owner_id= 1,
        recipe_id= 2,
        comment='Foraging for mushrooms is always a great way to get out in spring!'
    )

    comment_d = Comment(
        owner_id= 2,
        recipe_id= 3,
        comment='Great way to put up some excess eggs, going to try with quail eggs next time!'
    )

    db.session.add(comment_a)
    db.session.add(comment_b)
    db.session.add(comment_c)
    db.session.add(comment_d)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
