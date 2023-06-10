import React from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { deleteInstructionThunk } from "../../store/instruction";


export default function DeleteInstructionModal({ stepId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteInstructionThunk(stepId));
        closeModal();
    }

    return (
        <>
            <div className="delete-recipe-modal">
                <h2> Are you sure you want to delete this step? </h2>
                <div className="button-div">
                    <button className="delete-modal-delete-buttons" onClick={handleDelete}>Confirm</button>
                    <button className="delete-modal-delete-buttons" onClick={closeModal}>Decline</button>
                </div>
            </div>
        </>
    )
}
