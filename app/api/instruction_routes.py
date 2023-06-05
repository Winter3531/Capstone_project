from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db
from app.models.instruction import Instruction
from app.forms.create_instruction_form import CreateInstructionForm

instruction_routes = Blueprint('instructions', __name__)

@instruction_routes.route('/', methods=['POST'])
@login_required
def add_instruction():
    form = CreateInstructionForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_step = Instruction(
            recipe_id = form.data['recipe_id'],
            step_number = form.data['step_number'],
            step_text = form.data['step_text'],
        )

        db.session.add(new_step)
        db.session.commit()
        return new_step.step_to_dict()
    return jsonify('Form Error Instruction')
