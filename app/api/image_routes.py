from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db
from app.models.image import Image
from app.forms.create_image_form import CreateImageForm

image_routes = Blueprint('images', __name__)

@image_routes.route('/', methods=['POST'])
@login_required
def add_image():
    form = CreateImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    new_image = Image(
        image_type = form.data['image_type'],
        imageable_id = form.data['imageable_id'],
        preview = form.data['preview'],
        image = form.data['image'],
    )
    db.session.add(new_image)
    db.session.commit()
    return new_image.image_to_dict()


@image_routes.route('/<int:img_id>', methods=['PUT'])
@login_required
def edit_image(img_id):
    image_edit = Image.query.get(img_id)
    form = CreateImageForm()

    if image_edit:
        form['csrf_token'].data = request.cookies['csrf_token']
        image = form.data['image']

        image_edit.image = image

        db.session.commit()
        return image_edit.image_to_dict()
    return "Form Error"
