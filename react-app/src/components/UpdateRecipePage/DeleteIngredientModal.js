import React from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { deleteIngredientThunk } from "../../store/ingredient";


export default function DeleteIngredientModal({ ingredientId }) {

    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteIngredientThunk(ingredientId));
        closeModal();
    }

    return (
        <div className="delete-recipe-modal">
            <h2> Are you sure you want to delete this ingredient? </h2>
            <div className="button-div">
                <button className="delete-modal-delete-buttons" onClick={handleDelete}>Confirm</button>
                <button className="delete-modal-delete-buttons" onClick={closeModal}>Decline</button>
            </div>
        </div>
    )
}
