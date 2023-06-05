import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { addCommentThunk, getAllCommentsThunk } from "../../store/comment";


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
        <>
            <h2>Leave your comment</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    value={comment}
                    onChange={(e => setComment(e.target.value))}
                    id="comment-input"
                    onSubmit={handleSubmit}
                />
                <input
                    type="text"
                    value={image}
                    onChange={(e => setImage(e.target.value))}
                    placeholder="Comment Image"
                    id='comment-image-input'
                />
                <button type="submit" id="comment-submit" >Submit</button>
            </form>
        </>
    )
}
