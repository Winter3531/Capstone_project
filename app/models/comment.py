from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    comment = db.Column(db.String(), nullable=False)

    owners = db.relationship('User', back_populates='comments')

    recipe = db.relationship('Recipe', back_populates='comments')

    image = db.relationship(
        'Image',
        lazy=True,
        primaryjoin='and_(Image.image_type=="comment", foreign(Image.imageable_id)==Comment.id)',
        back_populates='image_comment',
        cascade="all, delete-orphan"
    )

    def comment_to_dict(self):
        return {
            'id': self.id,
            'owner': self.owners.to_dict(),
            'recipe_id': self.recipe_id,
            'comment': self.comment,
            'image': [img.image_to_dict()  for img in self.image] if self.image else []
        }
