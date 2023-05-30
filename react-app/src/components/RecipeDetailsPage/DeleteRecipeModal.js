import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { FaTrash } from 'react-icons/fa';
import { deleteRecipeThunk } from "../../store/recipe";

export default function DeleteRecipeModal ({id}) {

    const dispatch = useDispatch();
    const history = useHistory()
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteRecipeThunk(id))
        closeModal();
        return history.push('/collection')
    }

    return (
        <div className="delete-recipe-modal">
            <h2> Are you sure you want to delete this recipe? </h2>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
}
