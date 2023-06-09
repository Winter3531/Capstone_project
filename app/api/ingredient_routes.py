from flask import Blueprint, request
from flask_login import login_required
from app.models import db
from app.models.ingredient import Ingredient
from app.forms.create_ingredient_form import CreateIngredientForm

ingredient_routes = Blueprint('ingredients', __name__)

# ROUTE TO GET INGREDIENTS FOR A RECIPE
@ingredient_routes.route('/<int:recipe_id>')
def get_ingredients(recipe_id):
    ingredients = Ingredient.query.filter(Ingredient.recipe_id == recipe_id)

    return {ingredient.id: ingredient.ingredient_to_dict() for ingredient in ingredients} if ingredients else []

# ROUTE TO ADD A NEW INGREDIENT
@ingredient_routes.route('/add', methods=['POST'])
@login_required
def add_ingredient():
    form = CreateIngredientForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_ingredient = Ingredient(
            recipe_id = form.data['recipe_id'],
            ingredient_name = form.data['ingredient_name']
        )
        db.session.add(new_ingredient)
        db.session.commit()
        return new_ingredient.ingredient_to_dict()
    return 'Form Error ing'


# ROUTE TO DELETE AN INGREDIENT
@ingredient_routes.route('/<int:ingredient_id>/delete', methods=['DELETE'])
@login_required
def delete_ingredient(ingredient_id):
    ingredient = Ingredient.query.get(ingredient_id)
    if ingredient:
        db.session.delete(ingredient)
        db.session.commit()
        return ingredient.ingredient_to_dict()
    return 'Ingredient not found'
