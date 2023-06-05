from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateIngredientForm(FlaskForm):
    recipe_id = IntegerField('recipe_id', validators=[DataRequired()])
    ingredient_name = StringField('ingredient_name', validators=[DataRequired()])
