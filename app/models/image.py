from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Image(db.Model, UserMixin):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
