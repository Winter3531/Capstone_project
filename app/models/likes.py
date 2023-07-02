from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Like(db.Model, UserMixin):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    likeable_type = db.Column(db.Enum('recipe', 'user', name='likeable_type'), nullable=False)
    likeable_id = db.Column(db.Integer(), nullable=False)
    owner_id = db.Column(db.Integer(),  db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    like_owner = db.relationship('User', back_populates='user_likes')

    like_recipe = db.relationship('Recipe', primaryjoin='and_(Like.likeable_type=="recipe", foreign(Like.likeable_id)==Recipe.id)', overlaps="like")

    follow_user = db.relationship('User', primaryjoin='and_(Like.likeable_type=="user", foreign(Like.likeable_id)==User.id)', overlaps="like")

    def like_to_dict(self):
        return{
            'id': self.id,
            'likeable_type': self.likeable_type,
            'likeable_id': self.likeable_id,
            'owner_id': self.owner_id
        }
