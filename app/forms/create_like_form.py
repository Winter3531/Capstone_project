from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateLikeForm(FlaskForm):
    likeable_type = SelectField('likeable_type', choices=['recipe', 'user'], validators=[DataRequired()])
    likeable_id = IntegerField('likeable_id', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
