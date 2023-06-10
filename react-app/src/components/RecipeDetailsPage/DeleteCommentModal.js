import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { deleteCommentThunk, getAllCommentsThunk } from "../../store/comment";

import './DeleteModal.css'

export default function DeleteCommentModal({ commentId, recipeId }) {

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const sessionUser = useSelector(state => state?.session?.user)
    const { closeModal } = useModal();


    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteCommentThunk(commentId));
        closeModal();
        // (dispatch(getAllCommentsThunk(recipeId)));
    }

    return (
        <div className="delete-recipe-modal">
            <h2> Are you sure you want to delete this comment? </h2>
            <div className="button-div">
                <button className="delete-modal-delete-buttons" onClick={handleDelete}>Confirm</button>
                <button className="delete-modal-delete-buttons" onClick={closeModal}>Decline</button>
            </div>
        </div>
    )
}
