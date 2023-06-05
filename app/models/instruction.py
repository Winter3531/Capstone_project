from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Instruction(db.Model, UserMixin):
    __tablename__ = 'instructions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)
    step_number = db.Column(db.Integer, nullable=False)
    step_text = db.Column(db.String, nullable=False)

    instruction_recipe = db.relationship('Recipe', back_populates='recipe_instruction')

    def step_to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'step_number': self.step_number,
            'step_text': self.step_text
        }
