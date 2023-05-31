from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Ingredient(db.Model, UserMixin):
    __tablename__ = 'ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    ingredient_name = db.Column(db.String(), nullable=False)

    ingredient_recipe = db.relationship('Recipe', back_populates='recipe_ingredient')

    def ingredient_to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'ingredient_name': self.ingredient_name
        }
