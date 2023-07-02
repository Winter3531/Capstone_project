import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { allRecipesThunk } from '../../store/recipe';
import { getAllCommentsThunk } from '../../store/comment';
import { getIngredientThunk } from '../../store/ingredient';
import { FaTrash, FaRegCommentDots, FaRegEdit } from 'react-icons/fa';
import OpenModalButton from "../OpenModalButton";
import DeleteRecipeModal from './DeleteRecipeModal';
import AddCommentModal from './AddCommentModal';
import DeleteCommentModal from './DeleteCommentModal';
import EditCommentModal from './EditCommentModal';

import './RecipeDetails.css'
import { getInstructionThunk } from '../../store/instruction';

export default function RecipeDetails() {

    const dispatch = useDispatch();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state?.recipes[recipeId])
    const ingredients = useSelector(state => state?.ingredients)
    const instructions = useSelector(state => state?.instructions)
    const comments = useSelector(state => state?.comments)
    const sessionUser = useSelector(state => state?.session?.user)

    useEffect(() => {
        dispatch(allRecipesThunk())
        dispatch(getAllCommentsThunk(recipeId))
        dispatch(getIngredientThunk(recipeId))
        dispatch(getInstructionThunk(recipeId))
    }, [dispatch])

    const previewImg = recipe?.images.filter(img => {
        if (img.preview === true) {
            return img.image
        }
    })

    const recipeLengthFunc = (data) => {
        const min = data % 60
        const hr = (data - min) / 60
        if (min === 0) {
            if (hr < 2){
                return `${hr} hour`
            }else {
                return `${hr} hours`
            }
        }
        if (hr < 2) {
            return `${hr} hour ${min} minutes`
        } else {
            return `${hr} hours ${min} minutes`
        }
    }

    return (
        <div className='Recipe-detail-page'>
            <div className='header' >
                <img alt='cornocopia-title' id='title-image' src='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684713743/cornucopia_p2li2c.png' />
                <h1 id='g-and-g-header'>Game and Greens</h1>
            </div>

            {recipe && comments &&
                <>
                    <div className='recipe-info-div'>
                        <img src={previewImg[0]?.image} alt='recipe-image' id="details-preview-image" />
                        <h2 id='recipe-details-title'>{recipe.recipe_title}</h2>
                        <div className='recipe-details-type-time'>
                            <h3 id='recipe-details-type'>{recipe.recipe_type.toUpperCase()}</h3>
                            <h3 id='recipe-details-time'>{recipeLengthFunc(recipe.preperation_time)}</h3>
                        </div>
                        {sessionUser && sessionUser?.id === recipe.owner_id ?
                            <div className='edit-delete-buttons'>
                                <NavLink exact to={`/recipes/edit/${recipe.id}`}><FaRegEdit id='edit-button-edit-recipe' className='edit-button' /></NavLink>
                                <OpenModalButton
                                    buttonText={<FaTrash className='delete-button' />}
                                    modalComponent={<DeleteRecipeModal id={recipe.id} />}
                                />
                            </div> : <></>
                        }
                        <div className='notes-ingredients-instructions' >
                            <h3 id='recipe-details-chef-notes-title'>Chef's Notes</h3>
                            <p id='recipe-details-chef-notes'>{recipe.notes}</p>
                            <h3 id='recipe-details-ingredients-title' >Ingredients</h3>
                            <div className='ingredients-list'>
                                {Object.values(ingredients).map(ing => {
                                    return (
                                        <li key={`ing-${ing.id}`} className='ingredients-lines'>{ing.ingredient_name}</li>
                                    )
                                })}
                            </div>
                            <h3 id='recipe-details-instructions-title'>Instructions</h3>
                            {Object.values(instructions).map((inst) => {
                                return (
                                    <p className='instructions-lines' key={inst.id}>{inst.step_number}. {inst.step_text}</p>
                                )
                            })}
                        </div>
                    </div>

                    <div className='details-comments-div'>
                        {sessionUser && sessionUser?.id !== recipe.owner_id ?
                            <div className='details-comments-button' >
                                <OpenModalButton
                                    buttonText={<FaRegCommentDots className='comment-button' />}
                                    modalComponent={<AddCommentModal recipe_id={recipe.id} />}
                                />
                            </div> : <></>
                        }
                        <div className='comments-display'>
                            {Object.values(comments).map((comment, i) => {

                                return (
                                    <div className='comment-card' key={`comment-${i}`}>
                                        <div>
                                            <div className='comment-card-user-tile'>
                                                <img className='comment-card-user-tile-image' src={comment.owner.user_image} height={50} width={50} />
                                                <p>{comment.owner.username}</p>
                                            </div>
                                            <p>{comment.comment}</p>
                                        </div>
                                        {comment?.image[0]?.image?.length > 1 ?
                                            <img className='comment-card-image' src={comment.image[0].image} alt={comment.id} height={200} width={300} />
                                            : <></>
                                        }
                                        {sessionUser && comment.owner.id === sessionUser.id ?
                                            <div className='comment-edit-delete'>
                                                <OpenModalButton
                                                    buttonText={<FaTrash className='delete-button' />}
                                                    modalComponent={<DeleteCommentModal commentId={comment.id} recipeId={recipe.id} />}
                                                />
                                                <OpenModalButton
                                                    buttonText={<FaRegEdit className='edit-button' />}
                                                    modalComponent={<EditCommentModal commentId={comment.id} recipeId={recipe.id} />}
                                                />
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
