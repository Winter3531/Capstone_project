from flask import Blueprint, request
from flask_login import login_required
from app.models import db
from app.forms.create_like_form import CreateLikeForm
from app.models.likes import Like

like_routes = Blueprint('likes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# ROUTE TO CREATE A LIKE
@like_routes.route('/add', methods=['POST'])
@login_required
def add_like():
    form = CreateLikeForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_like = Like(
            likeable_type = form.data['likeable_type'],
            likeable_id = form.data['likeable_id'],
            owner_id = form.data['owner_id'],
        )
        db.session.add(new_like)
        db.session.commit()
        if new_like.likeable_type == 'recipe':
            return new_like.like_to_dict()
        else :
            return new_like.follow_to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# ROUTE TO REMOVE A LIKE
@like_routes.route('/<int:like_id>/delete', methods=['DELETE'])
@login_required
def delete_like(like_id):
    like = Like.query.get(like_id)

    if like:
        db.session.delete(like)
        db.session.commit()
        if like.likeable_type == 'recipe':
            return like.like_to_dict()
        else :
            return like.follow_to_dict()

    return "Like Not Found"
