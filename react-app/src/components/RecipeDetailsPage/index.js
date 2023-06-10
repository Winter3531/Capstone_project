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

    return (
        <div className='Recipe-detail-page'>
            <div className='header' >
                <img alt='cornocopia-title' id='title-image' src='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684713743/cornucopia_p2li2c.png' />
                <h1 id='g-and-g-header'>Game and Greens</h1>
            </div>

            {recipe && comments &&
                <>
                    <div >
                        <h2>{recipe.recipe_title}</h2>
                        <img src={previewImg[0]?.image} alt='recipe-image' id="details-preview-image" />
                        {sessionUser && sessionUser?.id === recipe.owner_id ?
                            <div className='edit-delete-buttons'>
                                <NavLink exact to={`/recipes/edit/${recipe.id}`}><button><FaRegEdit /></button></NavLink>
                                <OpenModalButton
                                    buttonText={<FaTrash  className='delete-button'/>}
                                    modalComponent={<DeleteRecipeModal id={recipe.id} />}
                                />
                            </div> : <></>
                        }
                        <h5>Chef's Notes</h5>
                        <p>{recipe.notes}</p>
                        <h5>Ingredients</h5>
                        {Object.values(ingredients).map(ing => {
                            return (
                                <div key={`ing-${ing.id}`} >
                                    <p>{ing.ingredient_name}</p>
                                </div>
                            )
                        })}
                        <h5>Instructions</h5>
                        {Object.values(instructions).map((inst) => {
                            return (
                                <div key={inst.id} >
                                    <p>{inst.step_number}. {inst.step_text}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className='details-comments-div'>
                        {sessionUser && sessionUser?.id !== recipe.owner_id ?
                                <div className='details-comments-button' >
                                    <OpenModalButton
                                        buttonText={<FaRegCommentDots />}
                                        modalComponent={<AddCommentModal recipe_id={recipe.id} />}
                                    />
                                </div> : <></>
                        }
                        <div className='comments-display'>
                            {Object.values(comments).map((comment, i) => {

                                return(
                                    <div className='comment-card' key={`comment-${i}`}>
                                        <div>
                                            <div className='comment-card-user-tile'>
                                                <img className='comment-card-user-tile-image' src={comment.owner.user_image} height={50} width={50}/>
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
                                            buttonText={<FaTrash  className='delete-button'/>}
                                            modalComponent={<DeleteCommentModal commentId={comment.id} recipeId={recipe.id} />}
                                            />
                                            <OpenModalButton
                                            buttonText={<FaRegEdit />}
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
