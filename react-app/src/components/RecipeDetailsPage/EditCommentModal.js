import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useModal } from "../../context/Modal";
import { editCommentThunk } from "../../store/comment";


export default function EditCommentModal ({commentId, recipeId}) {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user)
    const currComment = useSelector(state => state?.comments[commentId])
    const imageId = currComment.image[0]?.id
    const [comment, setComment] = useState(currComment?.comment);
    const [image, setImage] = useState(currComment?.image[0]?.image)
    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData = {
            'owner_id': sessionUser.id,
            'recipe_id': recipeId,
            'comment': comment,
        };
        await dispatch(editCommentThunk(commentId, commentData, imageId, image));
        setComment('');
        closeModal();
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
