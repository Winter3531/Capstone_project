from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateRecipeForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    recipe_type = SelectField('recipe_type', choices=['appetizer', 'breakfast', 'entree', 'side', 'dessert', 'other'], validators=[DataRequired()])
    recipe_title = StringField('recipe_title', validators=[DataRequired()])
    preperation_time = IntegerField('preperation_time', validators=[DataRequired()])
    notes = StringField('notes', validators=[DataRequired()])
