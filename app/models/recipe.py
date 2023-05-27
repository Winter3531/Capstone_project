from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Recipe(db.Model, UserMixin):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_title = db.Column(db.String(60), nullable=False)
    recipe_type = db.Column(db.Enum('appetizer', 'breakfast', 'entree', 'side', 'dessert', 'other'), nullable=False)
    preperation_time = db.Column(db.Integer(), nullable=False)
    notes = db.Column(db.String())
    ingredients = db.Column(db.String(), nullable=False)
    instructions = db.Column(db.String(), nullable=False)

    owners = db.relationship('User', back_populates='recipes')

    def recipe_to_dict(self):
        return {
            'id': self.id ,
            'owner_id': self.owner_id ,
            'recipe_type': self.recipe_type ,
            'recipe_title': self.recipe_title ,
            'preperation_time': self.preperation_time ,
            'notes': self.notes ,
            'ingredients': self.ingredients ,
            'instructions': self.instructions ,
        }
