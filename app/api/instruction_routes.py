from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db
from app.models.instruction import Instruction
from app.forms.create_instruction_form import CreateInstructionForm

instruction_routes = Blueprint('instructions', __name__)


# ROUTE TO ADD A STEP
@instruction_routes.route('/add', methods=['POST'])
@login_required
def add_instruction():
    form = CreateInstructionForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    print(request.data)
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


# ROUTE TO EDIT A STEP
@instruction_routes.route('/<int:step_id>/edit', methods=['PUT'])
@login_required
def edit_step(step_id):
    step = Instruction.query.get(step_id)
    form = CreateInstructionForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if (step):
        recipe_id = form.data['recipe_id']
        step_number = form.data['step_number']
        step_text = form.data['step_text']

        step.recipe_id = recipe_id
        step.step_number = step_number
        step.step_text = step_text

        db.session.commit()
        return step.step_to_dict()
    return 'Step not found'


# ROUTE TO DELETE A STEP
@instruction_routes.route('/<int:step_id>/delete', methods=['DELETE'])
@login_required
def delete_step(step_id):
    step = Instruction.query.get(step_id)
    if step:
        db.session.delete(step)
        db.session.commit()
        return step.step_to_dict()
    return 'Step not found'
