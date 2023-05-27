import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";

import { allRecipesThunk } from '../../store/recipe';

import './CollectionPage.css'

export default function CollectionPage(){

    const dispatch = useDispatch()
    const recipes = useSelector(state=>state?.recipes)

    useEffect(() => {
        dispatch(allRecipesThunk())
    }, [dispatch])

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
                                <h3>{recipe.recipe_title}</h3>
                                <h5>Chef's Notes</h5>
                                <p>{recipe.notes}</p>
                                </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
