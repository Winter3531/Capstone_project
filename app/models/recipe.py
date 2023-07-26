from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from flask import json


class Recipe(db.Model, UserMixin):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_title = db.Column(db.String(60), nullable=False)
    recipe_type = db.Column(db.Enum('appetizer', 'breakfast', 'entree', 'side', 'dessert', 'other', name='recipe_type'), nullable=False)
    preperation_time = db.Column(db.Integer(), nullable=False)
    notes = db.Column(db.String())

    owners = db.relationship('User', back_populates='recipes')

    comments = db.relationship('Comment', back_populates='recipe', cascade="all, delete-orphan")

    recipe_likes = db.relationship(
        'Like',
        lazy=True,
        primaryjoin='and_(Like.likeable_type=="recipe", foreign(Like.likeable_id)==Recipe.id)',
        back_populates='like_recipe',
        cascade="all, delete-orphan"
    )

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
            'owner_data': self.owners.user_info_dict(),
            'recipe_type': self.recipe_type ,
            'recipe_title': self.recipe_title ,
            'preperation_time': self.preperation_time ,
            'notes': self.notes ,
            'images': [img.image_to_dict() for img in self.image] if self.image else [],
            'likes': len(self.recipe_likes),
        }

    def recipe_title_to_dict(self):
        return {
            'recipe_title': self.recipe_title
        }
