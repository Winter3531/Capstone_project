import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom.min';

import { allRecipesThunk } from '../../store/recipe';
import { FaTrash } from 'react-icons/fa';
import OpenModalButton from "../OpenModalButton";
import DeleteRecipeModal from './DeleteRecipeModal';

import './RecipeDetails.css'

export default function RecipeDetails() {

    const dispatch = useDispatch();
    const { recipeId } = useParams();
    const recipe = useSelector(state => state?.recipes[recipeId])

    useEffect(() => {
        dispatch(allRecipesThunk())
    }, [dispatch])

    let count=0

    return(
        <div className='Recipe-detail-page'>
                        <div className='header' >
                <img alt='cornocopia-title' id='title-image' src='https://res.cloudinary.com/dtcuw5i2e/image/upload/v1684713743/cornucopia_p2li2c.png' />
                <h1 id='g-and-g-header'>Game and Greens</h1>
            </div>

            {recipe &&
            <div >
                <h2>{recipe.recipe_title}</h2>
                <NavLink exact to={`/recipes/edit/${recipe.id}`}><button>Edit Recipe</button></NavLink>
                <OpenModalButton
                    buttonText={<FaTrash />}
                    modalComponent={<DeleteRecipeModal id={recipe.id} />}
                />
                <h5>Chef's Notes</h5>
                <p>{recipe.notes}</p>
                <h5>Ingredients</h5>
                {recipe.ingredients.split(';').map((ingredient) => {
                    return(
                        <div key={`ingredient-${ingredient}`}>
                        <p>{ingredient}</p>
                        </div>
                        )
                    })}
                <h5>Instructions</h5>
                {recipe.instructions.split(';').map((step, i) =>{
                    return (
                        <div key={i}>
                        <p>{i+1}. {step}</p>
                        </div>
                    )})}
                    </div>
            }
        </div>
    )
}