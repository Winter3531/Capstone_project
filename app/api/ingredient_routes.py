from flask import Blueprint, request
from flask_login import login_required
from app.models import db
from app.models.ingredient import Ingredient
from app.forms.create_ingredient_form import CreateIngredientForm

ingredient_routes = Blueprint('ingredients', __name__)


@ingredient_routes.route('/', methods=['POST'])
@login_required
def add_ingredient():
    print('made it here***********************')
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
