from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models.likes import Like

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# ROUTE TO GET ALL LIKES BY USER ID
@user_routes.route('<int:user_id>/likes')
@login_required
def get_user_likes(user_id):
    likes = Like.query.filter(Like.owner_id == user_id, Like.likeable_type == 'recipe').all()

    if likes:
        return {like.id: like.like_to_dict() for like in likes} if likes else []
    return "No Likes"

# ROUTE TO GET ALL USER FOLLOWS BY USER ID
@user_routes.route('/<int:user_id>/follows')
@login_required
def get_user_follows(user_id):
    follows = Like.query.filter(Like.owner_id == user_id, Like.likeable_type == 'user').all()

    if follows:
        return {follow.id: follow.like_to_dict() for follow in follows } if follows else []
    return "No Follows"
