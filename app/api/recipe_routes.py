from flask import Blueprint, request
from flask_login import login_required
from app.models import db
from app.models.recipe import Recipe
from app.models.comment import Comment
from app.models.ingredient import Ingredient
from app.models.instruction import Instruction
from app.forms.create_recipe_form import CreateRecipeForm
from app.forms.create_ingredient_form import CreateIngredientForm

recipe_routes = Blueprint('recipes', __name__)


# ROUTE TO GET ALL RECIPES
@recipe_routes.route('/')
# @login_required
def recipes():
    recipes = Recipe.query.all()
    return {recipe.id: recipe.recipe_to_dict() for recipe in recipes}


# ROUTE TO CREATE A RECIPE
@recipe_routes.route('/', methods=['POST'])
@login_required
def add_recipe():
    form = CreateRecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_recipe = Recipe(
                owner_id = form.data['owner_id'],
                recipe_type = form.data['recipe_type'],
                recipe_title = form.data['recipe_title'],
                preperation_time = form.data['preperation_time'],
                notes = form.data['notes']
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.recipe_to_dict()
    return 'Form Error recipe'


# ROUTE TO EDIT A RECIPE
@recipe_routes.route('/<int:recipe_id>', methods=['PUT'])
@login_required
def update_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    form = CreateRecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        owner_id = form.data['owner_id']
        recipe_type = form.data['recipe_type']
        recipe_title = form.data['recipe_title']
        preperation_time = form.data['preperation_time']
        notes = form.data['notes']

        recipe.owner_id = owner_id
        recipe.recipe_type = recipe_type
        recipe.recipe_title = recipe_title
        recipe.preperation_time = preperation_time
        recipe.notes = notes

        db.session.commit()
        return recipe.recipe_to_dict()
    return "Form Error"


# ROUTE TO DELETE RECIPE
@recipe_routes.route('/<int:recipe_id>/delete', methods=['DELETE'])
@login_required
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if recipe:
        db.session.delete(recipe)
        db.session.commit()
        return recipe.recipe_to_dict()
    return "Recipe not found"


# ROUTE TO GET RECIPE COMMENTS
@recipe_routes.route('/<int:recipe_id>/comments', methods=['GET'])
def get_comments(recipe_id):
    comments = Comment.query.filter_by(recipe_id = recipe_id)
    return {comment.id: comment.comment_to_dict() for comment in comments}

# ROUTE TO GET INSTRUCTIONS FOR A RECIPE
@recipe_routes.route('/<int:recipe_id>/instructions', methods=['GET'])
def get_instructions(recipe_id):
    instructions = Instruction.query.filter_by(recipe_id = recipe_id)
    return {step.id: step.step_to_dict() for step in instructions} if instructions else []
