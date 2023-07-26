import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { addCommentThunk, getAllCommentsThunk } from "../../store/comment";

import './AddCommentModal.css'


export default function AddCommentModal ({recipe_id}) {

    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('')
    const sessionUser = useSelector(state => state?.session?.user)
    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData = {
            'owner_id': sessionUser.id,
            'recipe_id': recipe_id,
            'comment': comment,
        };
        dispatch(addCommentThunk(commentData, image));
        setComment('');
        closeModal();
        // dispatch(getAllCommentsThunk(recipe_id));
    }

    return (
        <div className="comment-modal">
            <h2>Leave your comment</h2>
            <form onSubmit={handleSubmit} className="add-comment-form">
                <textarea
                    type="text"
                    value={comment}
                    onChange={(e => setComment(e.target.value))}
                    id="comment-input"
                    onSubmit={handleSubmit}
                    placeholder="Comments?"
                    required
                />
                <input
                    type="url"
                    value={image}
                    onChange={(e => setImage(e.target.value))}
                    placeholder="Image"
                    id='comment-image-input'
                />
                <button type="submit" id="comment-submit" >Submit</button>
            </form>
        </div>
    )
}
