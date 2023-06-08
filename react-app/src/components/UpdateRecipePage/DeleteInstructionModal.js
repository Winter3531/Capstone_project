import React from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { deleteInstructionThunk } from "../../store/instruction";


export default function DeleteInstructionModal ({stepId}) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteInstructionThunk(stepId));
        closeModal();
    }

    return (
        <>
            <div className="delete-instruction-modal">
                <h2> Are you sure you want to delete this step? </h2>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={closeModal}>No</button>
            </div>
        </>
    )
}
