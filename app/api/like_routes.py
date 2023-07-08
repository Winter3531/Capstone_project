from flask import Blueprint, request
from flask_login import login_required
from app.models import db

like_routes = Blueprint('likes', __name__)

# ROUTE TO CREATE A LIKE
@like_routes.route('/add')
@login_required
def add_like():
    # form = AddLikeForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_like = Like(
            
        )
