from flask import Blueprint, request
from flask_login import login_required
from app.models import db
from app.models.recipe import Recipe
from app.forms.create_recipe_form import CreateRecipeForm

recipe_routes = Blueprint('recipes', __name__)


# ROUTE TO GET ALL RECIPES
@recipe_routes.route('/')
@login_required
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
                notes = form.data['notes'],
                ingredients = form.data['ingredients'],
                instructions = form.data['instructions']
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.recipe_to_dict()
    return 'Form Error'


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
        ingredients = form.data['ingredients']
        instructions = form.data['instructions']

        recipe.owner_id = owner_id
        recipe.recipe_type = recipe_type
        recipe.recipe_title = recipe_title
        recipe.preperation_time = preperation_time
        recipe.notes = notes
        recipe.ingredients = ingredients
        recipe.instructions = instructions

        db.session.commit()
        return recipe.recipe_to_dict()
    return "Form Error"

# ROUTE TO DELETE RECIPE
@recipe_routes.route('/<int:recipe_id>/delete', methods=['DELETE'])
@login_required
def delete_recipe(recipe_id):
    print(recipe_id, '*****************')
    recipe = Recipe.query.get(recipe_id)
    print(recipe.recipe_to_dict())
    if recipe:
        db.session.delete(recipe)
        db.session.commit()
        return recipe.recipe_to_dict()
    return "Recipe not found"
