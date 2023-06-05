from app.models import db, User, environment, SCHEMA
from app.models.image import Image
from sqlalchemy.sql import text


def seed_images():
    image_a = Image(
        image_type='comment',
        imageable_id= 1,
        preview=False,
        image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1685594420/HotVenisonSandwich_lujzeb.webp'
    )
    image_b = Image(
        image_type='comment',
        imageable_id= 3,
        preview=False,
        image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1685594380/oyster_mushroom_s1nhg0.jpg'
    )
    image_c = Image(
        image_type='comment',
        imageable_id= 4,
        preview=False,
        image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1685594365/clean_gizzards_m3cmdv.jpg'
    )


    image_d = Image(
        image_type='recipe',
        imageable_id= 1,
        preview=True,
        image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1685594405/turkey_tostada_gjdu14.webp'
    )
    image_e = Image(
        image_type='recipe',
        imageable_id= 2,
        preview=True,
        image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1685594375/MushroomGyro_pkqfj9.webp'
    )
    image_f = Image(
        image_type='recipe',
        imageable_id= 3,
        preview=True,
        image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1685594400/salt-cured_egg_yolk_inltjt.webp'
    )
    image_g = Image(
        image_type='recipe',
        imageable_id= 4,
        preview=True,
        image='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1685594320/Fried_gizzards_fzwlf8.webp'
    )

    db.session.add(image_a)
    db.session.add(image_b)
    db.session.add(image_c)
    db.session.add(image_d)
    db.session.add(image_e)
    db.session.add(image_f)
    db.session.add(image_g)
    # db.session.add(image_a)
    # db.session.add(image_a)
    db.session.commit()



def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
