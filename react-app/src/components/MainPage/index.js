import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";

import { allRecipesThunk } from '../../store/recipe';
import { deleteLikeThunk, getLikesThunk, newLikeThunk } from '../../store/like';

import './CollectionPage.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function CollectionPage() {

    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)
    const recipes = useSelector(state => state?.recipes)
    const likes = useSelector(state => state?.likes)

    useEffect(() => {
        dispatch(allRecipesThunk())
        dispatch(getLikesThunk(sessionUser?.id))
        if (sessionUser !== null){
        }
    }, [dispatch, sessionUser])

    const likefunction = (id) => {
        if (Object.values(likes).length) {
            for (let like of Object.values(likes)) {
                if (like.likeable_id == id) {
                    return true
                }
            }
        }
        return false
    }

    const setLikeTrue = async (e) => {
        e.preventDefault();
        const newLike = {
            likeable_type: 'recipe',
            likeable_id: e.currentTarget.getAttribute("data-value"),
            owner_id: sessionUser.id
        }
        await dispatch(newLikeThunk(newLike))
        await dispatch(allRecipesThunk())
    }

    const setLikeFalse = async (e) => {
        e.preventDefault();
        let likeId = null
        Object.values(likes).map(like => {
            if (like.likeable_id == e.currentTarget.getAttribute("data-value")) {
                likeId = like.id
            }
        })
        await dispatch(deleteLikeThunk(likeId))
        await dispatch(allRecipesThunk())
    }

    return (
        <div className='full-page'>
            <div className='header' >
                <img alt='cornocopia-title' id='title-image' src='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684713743/cornucopia_p2li2c.png' />
                <h1 id='g-and-g-header'>Game and Greens</h1>
            </div>
            <div className='recipe-card-layout'>
                {Object.values(recipes).map(recipe => {
                    return (
                        <div key={`recipe-${recipe.id}`} className='recipe-card'>
                            <NavLink exact to={`/recipes/${recipe.id}`} >
                                {Object.values(recipe.images).map((img, i) => {
                                    if (img.preview === true) {
                                        return (
                                            <img key={i} className='card-image' alt={`preview-${img.id}`} src={img.image} />
                                        )
                                    }
                                })}
                                <div className='recipe-card-info-div'>
                                    <div className='recipe-card-info-left'>
                                        <h3 className='recipe-card-title' >{recipe.recipe_title}</h3>
                                    </div>
                                    <div className='recipe-card-info-right'>
                                        <h3 id='card-like-counter' >Likes {recipe.likes}</h3>
                                        {sessionUser && (
                                            <div>
                                                {likefunction(recipe.id) ? (
                                                    <FaHeart data-value={recipe.id} className='colored-like-button' onClick={setLikeFalse} />
                                                ) : (
                                                    <FaRegHeart data-value={recipe.id} className='outlined-like-button' onClick={setLikeTrue} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
