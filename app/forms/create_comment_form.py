from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CreateCommentForm(FlaskForm):
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
    recipe_id = IntegerField('recipe_id', validators=[DataRequired()])
    comment = StringField('comment', validators=[DataRequired()])
