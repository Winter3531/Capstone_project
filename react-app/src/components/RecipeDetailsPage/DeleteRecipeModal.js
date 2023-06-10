import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { deleteRecipeThunk } from "../../store/recipe";

export default function DeleteRecipeModal({ id }) {

    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteRecipeThunk(id))
        closeModal();
        history.push('/collection')
    }

    return (
        <div className="delete-recipe-modal">
            <h2> Are you sure you want to delete this recipe? </h2>
            <div className="button-div">
                <button className="delete-modal-delete-buttons" onClick={handleDelete}>Confirm</button>
                <button className="delete-modal-delete-buttons" onClick={closeModal}>Decline</button>
            </div>
        </div>
    )
}
