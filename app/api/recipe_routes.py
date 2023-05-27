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
    return 'form error'
