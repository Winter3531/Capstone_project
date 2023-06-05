from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateImageForm(FlaskForm):
    imageable_id = IntegerField('imageable_id', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
