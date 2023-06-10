import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { FaTrash } from 'react-icons/fa';
import { editInstructionThunk } from "../../store/instruction";

import './EditInstructionModal.css'

export default function EditInstructionModal ({stepId}) {

    const dispatch = useDispatch();
    const instruction = useSelector(state => state?.instructions[stepId]);
    const [step_text, setStep] = useState(instruction?.step_text);
    const { closeModal } = useModal();

    const handleEditStep = async (e) => {
        e.preventDefault();
        const { recipe_id, step_number } = instruction;
        const stepData = {
            recipe_id,
            step_number,
            step_text
        };
        dispatch(editInstructionThunk(stepId, stepData));
        closeModal();
    }

    return (
        <div className="edit-step-modal">
            <h2> Edit Step </h2>
            <form onSubmit={handleEditStep} className="edit-step-form">
                <textarea
                    type="text"
                    value={step_text}
                    onChange={(e => setStep(e.target.value))}
                    id="edit-step-input"
                    required
                />
                <button type="submit" id="edit-step-submit">Submit</button>
            </form>
        </div>
    )
}
