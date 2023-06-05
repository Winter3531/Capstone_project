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

    owners = db.relationship('User', back_populates='recipes')

    comments = db.relationship('Comment', back_populates='recipe', cascade="all, delete-orphan")

    recipe_instruction = db.relationship(
        'Instruction',
        back_populates='instruction_recipe',
        cascade="all, delete-orphan"
    )

    recipe_ingredient = db.relationship(
        'Ingredient',
        back_populates='ingredient_recipe',
        cascade="all, delete-orphan"
    )

    image = db.relationship(
        'Image',
        lazy=True,
        primaryjoin='and_(Image.image_type=="recipe", foreign(Image.imageable_id)==Recipe.id)',
        back_populates='image_recipe',
        cascade="all, delete-orphan"
    )


    def recipe_to_dict(self):
        return {
            'id': self.id ,
            'owner_id': self.owner_id ,
            'recipe_type': self.recipe_type ,
            'recipe_title': self.recipe_title ,
            'preperation_time': self.preperation_time ,
            'notes': self.notes ,
            'ingredients': [ingredient.ingredient_to_dict() for ingredient in self.recipe_ingredient] if self.recipe_ingredient else [],
            'instructions': [step.step_to_dict() for step in self.recipe_instruction] if self.recipe_instruction else [],
            'images': [img.image_to_dict() for img in self.image] if self.image else [],
            # 'comments': [comment.comment_to_dict() for comment in self.comments] if self.comments else [],
        }
