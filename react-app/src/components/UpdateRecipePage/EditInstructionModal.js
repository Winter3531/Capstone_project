import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { FaTrash } from 'react-icons/fa';

export default function EditInstructionModal ({currStep}) {

    const dispatch = useDispatch();
    const [step, setStep] = useState(currStep)
    const { closeModal } = useModal();

    const handleEditStep = async (e) => {
        e.preventDefault();
        console.log(currStep, "Doesn't work!");
        closeModal();
    }

    return (
        <div className="edit-step-modal">
            <h2> Change Step </h2>
            <form onSubmit={handleEditStep} className="edit-step-form">
                <h4>Edit Step</h4>
                <textarea
                    type="text"
                    value={step}
                    onChange={(e => setStep(e.target.value))}
                    id="edit-step-input"
                />
            </form>
            <button type="submit" id="edit-step-submit">March!</button>
        </div>
    )
}
