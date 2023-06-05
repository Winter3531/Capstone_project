from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateInstructionForm(FlaskForm):
    recipe_id = IntegerField('recipe_id', validators=[DataRequired()])
    step_number = IntegerField('step_number', validators=[DataRequired()])
    step_text = StringField('step_text', validators=[DataRequired()])
