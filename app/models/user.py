from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .likes import Like


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    user_image = db.Column(db.String(), nullable=False)

    recipes = db.relationship('Recipe', back_populates='owners')

    comments = db.relationship('Comment', back_populates='owners')

    user_likes = db.relationship('Like', back_populates='like_owner')

    user_follows = db.relationship(
        'Like',
        lazy=True,
        primaryjoin='and_(Like.likeable_type=="user", foreign(Like.likeable_id)==User.id)',
        back_populates='follow_user'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        print(self, "$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'user_image': self.user_image,
        }

    def user_info_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'user_image': self.user_image,
        }
