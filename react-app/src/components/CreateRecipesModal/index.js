import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { addRecipeThunk } from "../../store/recipe";

import './CreateRecipeModal.css'

export default function CreateRecipeModal() {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')
    const [image, setImage] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [newStep, setNewStep] = useState('')
    const [instructions, setInstructions] = useState([])

    const user = useSelector(state => state.session?.user.id)

    const handleAddIngredient = async (e) => {
        e.preventDefault();
        // Intended Format "2 Tbsp. Salt"
        let ingredientArr = ingredients
        ingredientArr.push(quantity + ' ' + unit + ' ' + newIngredient)
        setIngredients(ingredientArr)
        setUnit('')
        setQuantity(0)
        setNewIngredient('')
    };

    const handleAddInstruction = async (e) => {
        e.preventDefault();
        let instructionsArr = instructions;
        instructionsArr.push(newStep)
        setInstructions(instructionsArr)
        setNewStep('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // INTENDED FORMAT
        // ingredients:"1 cup Milk;2 tbsp. Sugar"
        // instructions:"Step 1.;Step 2."
        // notes:"The notes."
        // owner_id:1
        // preperation_time:"50"
        // recipe_title:"Title"
        // recipe_type:"Entree"

        const recipeData = {
            owner_id: user,
            recipe_title: title,
            recipe_type: type.toLowerCase(),
            preperation_time: Number(time),
            notes,
        }
        const recipe_id = await dispatch(addRecipeThunk(recipeData, ingredients, instructions, image));

        history.push(`/recipes/${recipe_id.id}`)
    };


    return (
        <div className="post-recipe-modal">
            <h1 id='post-recipe-header'>Post a New Recipe</h1>
            <hr></hr>
            <form className="recipe-details-form">
                <div className="left-details-div">
                    <label>
                        Recipe Title
                        <input
                            type="text"
                            value={title}
                            onChange={(e => setTitle(e.target.value))}
                            placeholder="Recipe Title"
                            id='title-input'
                        />
                    </label>

                    <label>
                        Recipe Type
                        <select
                            id='recipe-type-select'
                            onChange={e => setType(e.target.value)}
                        >
                            <option> </option>
                            <option>Appetizer</option>
                            <option>Breakfast</option>
                            <option>Entree</option>
                            <option>Side</option>
                            <option>Dessert</option>
                            <option>Other</option>
                        </select>
                    </label>

                    <label>
                        Preparation Time
                        <input
                            type="text"
                            value={time}
                            onChange={(e => setTime(e.target.value))}
                            placeholder="How many minutes?"
                            id='time-input'
                        />
                    </label>

                    <label>
                        Preview Image
                        <input
                            type="text"
                            value={image}
                            onChange={(e => setImage(e.target.value))}
                            placeholder="Preview Image"
                            id="preview-image-input"
                        />
                    </label>
                </div>

                <div className="right-details-div" >
                    <label id='chef-note-label'>
                        Chef's Notes
                        <textarea
                            type="text"
                            value={notes}
                            onChange={(e => setNotes(e.target.value))}
                            id="chef-note-input"
                        />
                    </label>
                </div>
            </form>

            <hr></hr>

            <div className="ingredients-div">
                <form onSubmit={handleAddIngredient} className="add-ingredient-form">
                    <label>Quantity
                        <input
                            id="quantity-input"
                            type="decimal"
                            value={quantity}
                            onChange={(e => setQuantity(e.target.value))}
                        />
                    </label>

                    <label>Unit
                        <select
                            id='unit-select'
                            onChange={e => setUnit(e.target.value)}
                        >
                            <option></option>
                            <option>tbsp.</option>
                            <option>tsp.</option>
                            <option>oz.</option>
                            <option>cup</option>
                            <option>pint</option>
                            <option>quart</option>
                            <option>gallon</option>
                            <option>gram</option>
                            <option>lb</option>
                            <option>mililiter</option>
                            <option>liter</option>
                        </select>
                    </label>

                    <label>
                        Ingredient
                        <input
                            className="ingredient-input"
                            type="text"
                            value={newIngredient}
                            onChange={(e => setNewIngredient(e.target.value))}
                            placeholder="Next Ingredient?"
                        />
                    </label>

                    <button type="submit" id='add-ingredient-submit'>Add</button>
                </form>

                <div className="ingredient-list-div">
                    <h5>Ingredient List</h5>
                    {ingredients.length ? (
                        ingredients.map(i =>
                            <li key={i} >{i}</li>
                        )
                    ) : (
                        <p>None</p>
                    )
                    }
                </div>
            </div>

            <hr></hr>

            <div className="instructions-div" >
                <form onSubmit={handleAddInstruction} className="add-instruction-form">
                    <label id="add-step-label" >
                        Add a Step
                        <textarea
                            type="text"
                            value={newStep}
                            onChange={(e => setNewStep(e.target.value))}
                            placeholder="Next Step?"
                            id="add-step-input"
                        />
                    </label>
                    <button type="submit" id='add-instruction-submit'>Add</button>
                </form>

                <div className="instruction-list-div">
                    <h5>Instructions</h5>
                    {instructions.length ? (
                        instructions.map((step, i) =>
                            <p key={`step-${i}`} >{i + 1}. {step}</p>
                        )
                    ) : (
                        <p>None</p>
                    )
                    }
                </div>

            </div>
            <button type="submit" onClick={handleSubmit} id='recipe-submit-button'>Start Cooking</button>
        </div>
    )
}
