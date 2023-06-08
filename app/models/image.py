from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Image(db.Model, UserMixin):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    image_type = db.Column(db.Enum('comment', 'recipe', name='image_type'), nullable=False)
    imageable_id = db.Column(db.Integer(), nullable=False)
    preview = db.Column(db.Boolean, default=False)
    image = db.Column(db.String(), nullable=False)

    image_recipe = db.relationship('Recipe', primaryjoin='and_(Image.image_type=="recipe", foreign(Image.imageable_id)==Recipe.id)', overlaps="image")

    image_comment = db.relationship('Comment', primaryjoin='and_(Image.image_type=="comment", foreign(Image.imageable_id)==Comment.id)', overlaps="image")

    def image_to_dict(self):
        return {
            'id': self.id,
            'image_type': self.image_type,
            'imageable_id': self.imageable_id,
            'preview': self.preview,
            'image': self.image
        }
