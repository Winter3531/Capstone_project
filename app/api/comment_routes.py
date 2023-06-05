from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db
from app.models.comment import Comment
from app.forms.create_comment_form import CreateCommentForm

comment_routes = Blueprint('comments', __name__)

# # ROUTE TO GET ALL COMMENTS FOR A RECIPE
# @comment_routes.route('/<int:recipe_id>', methods=['GET'])
# def get_comments(recipe_id):
#     comments = Comment.query.filter_by(recipe_id = recipe_id)
#     return {comment.id: comment.comment_to_dict() for comment in comments}

#  ROUTE TO ADD A COMMENT
@comment_routes.route('/', methods=['POST'])
@login_required
def add_comment():

    form = CreateCommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            owner_id = form.data['owner_id'],
            recipe_id = form.data['recipe_id'],
            comment = form.data['comment'],
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.comment_to_dict()
    return jsonify('Form Error Comment')

# ROUTE TO DELETE A COMMENT
@comment_routes.route('/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def delete_comment(comment_id):
    edit_comment = Comment.query.get(comment_id)
    form = CreateCommentForm()

    if edit_comment and request.method == 'GET':
        return edit_comment.comment_to_dict()

    if edit_comment and request.method == 'PUT':
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            comment = form.data['comment']

            edit_comment.comment = comment

            db.session.commit()
            return edit_comment.comment_to_dict()

    if edit_comment and request.method == 'DELETE':
        db.session.delete(edit_comment)
        db.session.commit()
        return edit_comment.comment_to_dict()
    return jsonify('Comment not found')
