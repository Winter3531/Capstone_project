import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";

import { allRecipesThunk } from '../../store/recipe';
import { deleteLikeThunk, getLikesThunk, newLikeThunk } from '../../store/like';

import './CollectionPage.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { collectionUserThunk } from '../../store/session';
import { deleteFollowThunk, newFollowThunk, getFollowsThunk } from '../../store/follow';

export default function UserCollectionPage() {

    const { userId } = useParams();
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)
    const recipes = useSelector(state => state?.recipes)
    const likes = useSelector(state => state?.likes)
    const follows = useSelector(state => state?.follows)
    const collectionUser = useSelector(state => state?.session?.collectionUser)

    useEffect(() => {
        dispatch(allRecipesThunk())
        dispatch(collectionUserThunk(userId))
        if (sessionUser !== null) {
            dispatch(getLikesThunk(sessionUser?.id))
        }
    }, [dispatch])

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

    const followFunction = (id) => {
        if (Object.values(follows).length) {
            for (let follow of Object.values(follows)) {
                if (follow.likeable_id == id) {
                    return true;
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

    const followUser = async (e) => {
        e.preventDefault()
        const newFollow = {
            likeable_type: 'user',
            likeable_id: userId,
            owner_id: sessionUser.id
        }
        await dispatch(newFollowThunk(newFollow))
        await dispatch(getFollowsThunk(sessionUser?.id))
    }

    const unfollowUser = async (e) => {
        e.preventDefault()
        let followId = null
        Object.values(follows).map(follow => {
            if (follow.likeable_id == userId) {
                followId = follow.id
            }
        })
        await dispatch(deleteFollowThunk(followId))
        await dispatch(getFollowsThunk(sessionUser?.id))
    }

    return (
        <div className='full-page'>
            <div className='collection-user-header' >
                <img alt='user-image' className='collection-user-image' src={collectionUser?.user_image} />
                <div className='colection-user-content-div' >
                    <h1 className='user-page-title'>{collectionUser?.username}</h1>
                    {sessionUser?.id == userId ? (
                        <div className='user-profile-page-data' >
                            <h3>{sessionUser?.email}</h3>
                            <h3>{sessionUser?.first_name} {sessionUser?.last_name}</h3>
                        </div>
                    ) : (
                        <>
                            {sessionUser !== null ? (
                                <>
                                    {followFunction(userId) ? (
                                        <button className="folow-user-button" onClick={unfollowUser} >Unfollow</button>
                                    ) : (
                                        <button className="folow-user-button" onClick={followUser} >Follow</button>
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className='recipe-card-layout'>
                {Object.values(recipes).map(recipe => {
                    if (recipe.owner_id == userId) {
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
                    }
                })}
            </div>
        </div>
    )
}
